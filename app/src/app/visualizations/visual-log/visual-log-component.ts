import * as d3 from "d3";
import $ from "jquery";

import { GraphChartConfig } from "../../models/viz";
import {SessionPage} from "../../models/config";
import {UtilsService} from "src/app/services/utils.service";
import {ChatService} from "../../services/socket.service";


export class VisualLog {
    graphChartConfig;
    plotWidth: number;
    plotHeight: number;
    plotGroup;
    container: any;
    svg: any;
    width: number;
    height: number;


    constructor(
        public utilsService: UtilsService,
        public chatService: ChatService,
        public global: SessionPage,
        public userConfig,
        public appConfig
    ) {
        this.graphChartConfig = new GraphChartConfig();
    }

    initialize() {
        const context = this;
        this.container = "#graph_container";
        this.width = $(this.container).parent().width();
        this.height = $(this.container).parent().height();

        $(this.container).empty();

        this.svg = d3
            .select(this.container)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);


    }

    update(metaData) {
        const context = this;
        const elements: Array<object> = [];
        let utils = context.utilsService;
        if (metaData !== null) {
            elements.push(metaData);
            const circles = this.svg.append("g")
                .selectAll("circle")
                .data([{name: "A"}, {name: "B"}, {name: "C"}, {name: "D"}])
                .enter()
                .append("circle")
                .attr("r", 25)
                .attr("cx", this.width / 2)
                .attr("cy", this.height / 2)
                .style("fill", "#ffffff")
                .style("fill-opacity", 0.3)
                .attr("stroke", "#000000")
                .style("stroke-width", 2);

            context.plotGroup = this.svg
                .append("g")
                .classed("plot", true);
        }

        console.log(metaData);
        console.log(utils);
    }
}

