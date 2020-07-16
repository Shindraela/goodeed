<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        <router-link to='/' tag='span' style='cursor: pointer'>
          <v-img src="https://static.goodeed.com/pictures/goodeed/home/lgbtq/logo_home.svg"></v-img>
        </router-link>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-row justify="end">
        <v-flex xs12 sm6 md3 align-self-center v-show="visible">
          Don financé par <span class="stylized-ad-title">{{ getAd.title }}</span>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-progress-linear rounded height="40" :value="count" v-show="visible" :color="displayProgressBarBtn || confirmedProgressBarText ? 'green' : 'blue'">
            <div v-show="displayProgressBarText">
              <span>Don en cours</span>
              <strong>{{ totalTime }}</strong>
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
    nextStep () {
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
</style>
