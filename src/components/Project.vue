<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <a :href="'//' + getAd.redirect_uri" target="_blank">
          <video id="video">
            <source :src="getAd.video_uri" type="video/mp4" />
          </video>
        </a>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12">
        <v-dialog v-model="dialog" persistent width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Don gratuit</v-card-title>
            <v-card-text>Clique sur play et regarde la vidéo pendant au moins 20 secondes pour faire ton don gratuitement.</v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="playVideo(); dialog = false;">Play</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="show" persistent width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Tu viens de faire un don pour l'association {{ associationTitle }}</v-card-title>
            <v-card-text>
              Ne sous-estime pas la puissance de ton réseau !
              <br />
              1 partage incite en moyenne vos proches à faire 12 dons
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" @click="confirmDonation()">Confirmer le don</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Project",
  data() {
    return {
      dialog: true,
      persistent: true
    };
  },
  // create blur and focus event listeners to make video play and pause
  created() {
    window.addEventListener("blur", this.getPaused);
  },
  destroyed() {
    window.removeEventListener("focus", this.getPlayed);
    window.removeEventListener("blur", this.getPaused);
  },
  computed: {
    ...mapGetters([
      "getAd",
      "getProjectById",
      "getAssociationById"
    ]),
    show() {
      return this.$store.state.show;
    },
    play() {
      return this.getPlayed();
    },
    pause() {
      return this.getPaused();
    },
    // get the project related to the association
    project() {
      const projectId = this.$route.params.id;
      return this.getProjectById(projectId);
    },
    // use the asso_id of returned project to get related association and its title
    associationTitle() {
      const project = this.project;
      const title = project ? this.getAssociationById(project.asso_id).title : "";
      
      return title;
    }
  },
  methods: {
    ...mapActions([
      "startCounter",
      "stopCounter",
      "showProgressBar",
      "setRandomAd",
      "setCounterPause",
      "removeCounterPause",
    ]),
    // play video and start counter
    playVideo() {
      let myVideo = document.getElementById("video");

      if (this.dialog === true) {
        myVideo.play();
        window.addEventListener("focus", this.getPlayed);
        this.removeCounterPause();
        this.startCounter();
      }
    },
    // at the end, stop counter and prepare for next ad project page by setting new random ad
    confirmDonation() {
      this.stopCounter();
      this.setRandomAd();
      this.$router.push("/");
    },
    // use in event listener for watching if user still present on the page
    // if yes, then play the video and counter
    getPlayed() {
      let myVideo = document.getElementById("video");
      myVideo.play();
      this.removeCounterPause();
    },
    // if not, set video and counter on pause
    getPaused() {
      let myVideo = document.getElementById("video");
      myVideo.pause();
      this.setCounterPause();
    }
  },
  // check if progress bar is displayed before charging the project page
  // access to component's instance using `vm`, navigation guard is called before the component is created
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.showProgressBar();
      vm.removeCounterPause();
      next();
    });
  },
  // reset the counter when user leave the current project page
  // and set a new ad for next project visualized by the user
  beforeRouteLeave(to, from, next) {
    this.stopCounter();
    this.setRandomAd();
    next();
  }
};
</script>

<style scoped lang="scss">
video {
  /* override other styles to make responsive */
  width: 100% !important;
  height: auto !important;
}
</style>
