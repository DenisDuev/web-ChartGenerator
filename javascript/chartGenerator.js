function createChart() {
    return {
        type: {},
        data: {},
        options: {},

        onInit: function (sType) {
            this.type = sType;
            if (sType === "area") {
                this.options = {
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                };
            } else {
                this.options = {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                };
            }

        },

        addLabels: function (aLabels) {
            this.data.labels = aLabels;
        },

        addDataset: function (iIndex, aData, sLabel, iBorderWidth, aBackgroundColor) {
            if (!this.data.datasets) {
                this.data.datasets = [];
            }

            this.data.datasets[iIndex] = {};
            this.data.datasets[iIndex].data = aData;
            this.data.datasets[iIndex].label = sLabel;
            this.data.datasets[iIndex].label = sLabel;
            this.data.datasets[iIndex].borderWidth = iBorderWidth;
            this.data.datasets[iIndex].backgroundColor = aBackgroundColor;
        },

        addChartIn: function (sElementId) {
            var ctx = document.getElementById(sElementId).getContext('2d');
            var myChart = new Chart(ctx, {
                type: this.type,
                data: this.data,
                options: this.options
            });
        }
    }
}