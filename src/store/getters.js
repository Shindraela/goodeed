import ProjectData from "@/models/projectData.js";
import AdCampaignData from "@/models/adCampaignData.js";
import AssociationData from "@/models/associationData.js";

export default {
  getProjects: state => {
    return state.projects = [...ProjectData.ProjectData];
  },
  getProjectById: state => id => {
    return state.projects.find(project => project._id === id);
  },
  getAssociations: state => {
    return state.associations = [...AssociationData.AssociationData];
  },
  getAssociationById: state => id => {
    state.associations = [...AssociationData.AssociationData];
    return state.associations.find(association => association._id === id);
  },
  getAd: state => {
    state.ad = [...AdCampaignData.AdCampaignData];
    return state.ad[Math.floor(Math.random() * state.ad.length)];
  },
  // calculate the percentage of each project with data of donation_current and donation_goal
  percentages: state => {
    let value = 0;
    let values = [];

    state.projects.forEach(element => {
      value = Math.round((element.donation_current / element.donation_goal) * 100);
      values.push(value);

    });
    return values;
  }
}
