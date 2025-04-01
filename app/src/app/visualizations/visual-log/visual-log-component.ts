import * as d3 from "d3";
import $ from "jquery";

import { GraphChartConfig } from "../../models/viz";
import {SessionPage} from "../../models/config";
import {UtilsService} from "src/app/services/utils.service";
import {ChatService} from "../../services/socket.service";
import {element} from "protractor";
import {GraphVisualLog} from "../../models/visualLog";


export class VisualLog {
    graphChartConfig;
    plotWidth: number;
    plotHeight: number;
    plotGroup;
    container: any;
    svg: any;
    width: number;
    height: number;
    level: number;

    elements: Array<GraphVisualLog>;

    constructor(
        public utilsService: UtilsService,
        public chatService: ChatService,
        public global: SessionPage,
        public userConfig,
        public appConfig
    ) {
        this.graphChartConfig = new GraphChartConfig();
        this.elements = [];
        this.level = 1;
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
        this.elements.push({...metaData, color: "red", level: this.level, x: 100, y: 100, radio: 10});
        console.log(this.elements);
        if (this.elements) {
            this.svg.selectAll("*").remove();
            const circles = this.svg.append("g")
                .selectAll("circle")
                .data(this.elements)
                .enter()
                .append("circle")
                .attr("r", (d) => d.radio)
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y * d.level)
                .style("fill", (d) => d.color)
                .style("fill-opacity", 0.3)
                .attr("stroke", "#000000")
                .style("stroke-width", 2);

            context.plotGroup = this.svg
                .append("g")
                .classed("plot", true);
            this.level = this.level + 0.5;
            //$(this.container).empty();
        }
    }
}

