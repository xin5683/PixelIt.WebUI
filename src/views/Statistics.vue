<template>
    <v-container class="statistics">
            <v-row>
                <v-col cols="12" lg="4">
                    <v-card class="pa-1" elevation="4">
                        <v-card-title>
                            <h2>Builds</h2>
                        </v-card-title>
                        <hr />
              
                        <apexchart height="600px" width="100%" type="bar" :options="chartOptions" :series="buildStats"></apexchart>
                    </v-card>                   
                </v-col>
                <v-col cols="12" lg="4">
                    <v-card class="pa-2" elevation="4">
                        <v-card-title>
                            <h2>Versions</h2>
                        </v-card-title>
                        <hr />
                      
                        <apexchart height="600px" width="100%" type="bar" :options="chartOptions" :series="versionStats"></apexchart>                  
                    </v-card>
                </v-col>
                <v-col cols="12" lg="4">
                    <v-card class="pa-2" elevation="4">
                        <v-card-title>
                            <h2>Country</h2>
                        </v-card-title>
                        <hr />                    
                       <apexchart type="donut" :options="countryChartOptions" :series="countryStats"></apexchart>     
                    </v-card>                   
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" lg="12">
                <v-card class="pa-2" elevation="4">
                    <v-card-title>
                        <h2>Usermap</h2>
                    </v-card-title>
                    <hr />
                    <p></p>
                    <UserMap :mapZoom= 3  :coords="userMapData" height="600px" />
                </v-card>
            </v-col>
            </v-row>
    </v-container>
</template>

<script>
import UserMap from '../components/UserMap';

export default {
    name: 'Statistics',
     data: () => ({        
    }),
    components: {
        UserMap,
    },
    computed: {
        userMapData() {
            return this.$store.state.userMapData;
        },
        buildStats() {
            if (this.$store.state.statistics.buildStats){
                return [ { name: 'Count', data: this.$store.state.statistics.buildStats
                    .map(({build: x, count})=>({count, x}))
                    .map(({count: y, x})=>({y, x}))}];
            }
            return [];           
        },  
        versionStats() {
            if (this.$store.state.statistics.versionStats){
                return [ { name: 'Count', data: this.$store.state.statistics.versionStats
                    .map(({version: x, count})=>({count, x}))
                    .map(({count: y, x})=>({y, x}))}];
            }
            return [];           
        }, 
        countryStats() {
            if (this.$store.state.statistics.countryStats){
                return  this.$store.state.statistics.countryStats.map(x=> x.count) ;
            }
            return [];           
        },
        countryChartOptions(){
            return { 
                labels: this.$store.state.statistics.countryStats ? this.$store.state.statistics.countryStats.map(x=> x.country) : [],
                theme: {
                    mode: this.$vuetify.theme.dark ? 'dark' : 'light',
                    palette: 'palette10',
                },
                chart: {
                    background: '#00000000',
                    dropShadow: {
                        enabled: false,
                    }
                }, 
                plotOptions: {
                    pie: {                        
                        expandOnClick: true,
                        donut: {
                            size: '0%',
                            labels: {                               
                                show: false,
                            }
                        }
                    }
                }
            };
        },
        chartOptions(){
            return {                
                plotOptions: {
                    bar: {
                        horizontal: false,
                        distributed: true,         
                    },
                },
                dataLabels: {
                    enabled: true,
                },
                legend: {
                    show: false,
                },
                theme: {
                    mode: this.$vuetify.theme.dark ? 'dark' : 'light',
                    palette: 'palette10',
                },
                chart: {
                    background: '#00000000',
                    dropShadow: {
                        enabled: false,
                    }
                } 
            };
        }     
    },
    methods: {       
    },
    watch: {        
    },
};
</script>
<style>
ul {
    margin-top: 10px;
}
li {
    margin-left: 20px;
}
</style>