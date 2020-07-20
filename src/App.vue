<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        <router-link to='/' tag='span' style='cursor: pointer'>
          <v-img src="https://static.goodeed.com/pictures/goodeed/home/lgbtq/logo_home.svg" alt="goodeed_logo" class="img-responsive"></v-img>
        </router-link>
      </v-toolbar-title>
      
      <v-spacer class="spacer-flex-grow"></v-spacer>

      <v-row justify="end">
        <v-flex xs12 sm6 md3 align-self-center v-show="visible" class="donator-container">
          Don financé par <span class="stylized-ad-title">{{ getAd.title }}</span>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-progress-linear rounded height="40" :value="count" v-show="visible" :color="displayProgressBarBtn || confirmedProgressBarText ? 'green' : 'blue'">
            <div v-show="displayProgressBarText" class="align-self-center">
              <span class="text-padding">Don en cours</span>
              <strong class="text-padding">{{ totalTime }}</strong>
            </div>
            <v-btn text class="align-self-center" v-show="displayProgressBarBtn" @click="nextStep()">Valider mon don</v-btn>
            <span v-show="confirmedProgressBarText">Publicité confirmée</span>
          </v-progress-linear>
        </v-flex>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState([
      "projects",
      "count",
      "visible",
      "totalTime",
      "displayProgressBarText",
      "displayProgressBarBtn",
      "confirmedProgressBarText"
    ]),
    getAd() {
      return this.$store.getters.getAd;
    },
    allProjects() {
      return this.$store.getters.allProjects;
    }
  },
  methods: {
    ...mapActions([
      "showProgressBar",
      "hideProgressBar",
      "showModal",
      "setCurrentProject_id",
      "setCurrentAd_id"
    ]),
    updateProject() {
      return this.allProjects.filter(project => {
        if(project._id === this.$route.params.id) {
          project.donation_current += 1;
        }
      });
    },
    nextStep () {
      const projectId = this.$route.params.id;
      const adId = this.getAd._id;
      localStorage.setItem("currentProjectId", projectId);
      localStorage.setItem("currentAdId", adId);

      this.updateProject();
      this.showModal();
    }
  },
  watch: {
    $route: function() {
      if (this.$route.path != "/") {
        this.showProgressBar();
        } else  {
        this.hideProgressBar();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.stylized-ad-title {
  color: #2196f3;
  font-weight: bold;
}

.img-responsive {
  width: 100%;
  height: auto;
}

.text-padding {
  padding: 0 0.5rem;
}

.donator-container {
  display: none;
}

@media screen and (max-width: 768px) {
  .img-responsive {
    width: 73px !important;
  }

  .spacer-flex-grow {
    flex-grow: 0.5 !important;
  }

}

@media screen and (min-width: 600px) {
  .donator-container {
    display: inline-block;
  }
}

@media screen and (min-width: 960px) and (max-width: 1024px) {
  .spacer-flex-grow {
    flex-grow: 0.2 !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1440px) {
  .spacer-flex-grow {
    flex-grow: 0.5 !important;
  }
}
</style>
