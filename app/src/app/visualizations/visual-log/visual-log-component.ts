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
        const container = "#graph_container";
        const width = $(container).parent().width();
        const height = $(container).parent().height();

        $(container).empty();

        const svg = d3
            .select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const circles = svg.append("g")
            .selectAll("circle")
            .data([{name: "A"}, {name: "B"}, {name: "C"}, {name: "D"}])
            .enter()
            .append("circle")
                .attr("r", 25)
                .attr("cx", width / 2)
                .attr("cy", height / 2)
                .style("fill", "#69b3a2")
                .style("fill-opacity", 0.3)
                .attr("stroke", "#69a2b2")
                .style("stroke-width", 4);

        context.plotGroup = svg
            .append("g")
            .classed("plot", true);
    }
}

