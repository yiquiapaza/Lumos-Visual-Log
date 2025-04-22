import * as d3 from "d3";
import $ from "jquery";

import {GraphChartConfig} from "../../models/viz";
import {SessionPage} from "../../models/config";
import {UtilsService} from "src/app/services/utils.service";
import {ChatService} from "../../services/socket.service";
import {element} from "protractor";
import {GraphVisualLog, LinksVisualLog} from "../../models/visualLog";


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
    id: number;

    xScale: any;
    yScale: any;

    circlePosiY: number;
    circlePosiX: number;

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
        this.id = 0;
        this.circlePosiY = 100;
        this.circlePosiX = 100;
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

        this.xScale = d3.scaleLinear()
            .domain([0, this.width])
            .range([0, this.width]);

        this.yScale = d3.scaleLinear()
            .domain([0, this.height])
            .range([0, this.height]);

    }

    update(metaData) {
        const context = this;
        this.elements.push({
            ...metaData,
            color: "red",
            level: this.level,
            x: this.circlePosiX,
            y: this.circlePosiY,
            radio: 10,
            id: this.id
        });
        const linksData = [
            {source: 0, target: 1, color: "red", width: 2},
            {source: 1, target: 2, color: "purple", width: 3},
            {source: 2, target: 3, color: "teal", width: 1}
        ];
        const linksData1 = this.createLinks(this.id);
        console.log("Links Data", linksData1);
        console.log(this.elements);
        if (this.elements) {
            this.svg.selectAll("*").remove();
            const nodes = this.svg.append("g")
                .selectAll(".node")
                .data(this.elements)
                .enter()
                .append("circle")
                .attr("class", "node")
                .attr("r", (d) => d.radio)
                .attr("cx", (d) => this.xScale(d.x))
                .attr("cy", (d) => this.yScale(d.y))
                .style("fill", (d) => d.color)
                .style("fill-opacity", 0.3)
                .attr("stroke", "#000000")
                .style("stroke-width", 2);

            const links = this.svg.append("g")
                .selectAll(".link")
                .data(linksData1)
                .enter()
                .append("line")
                .attr("class", "link")
                .style("stroke", (d) => d.color)
                .style("stroke-width", (d) => d.width)
                .attr("x1", (d) => {
                    const sourceNode = this.elements.find((node) => node.id === d.source);
                    console.log("sourceNodeX", sourceNode.x);
                    return sourceNode ? sourceNode.x : 0;
                })
                .attr("y1", (d) => {
                    const sourceNode = this.elements.find((node) => node.id === d.source);
                    console.log("sourceNodeY", sourceNode.y);
                    return sourceNode ? sourceNode.y : 0;
                })
                .attr("x2", (d) => {
                    const targetNode = this.elements.find((node) => node.id === d.target);
                    if (targetNode) {
                        console.log("targetNodeX", targetNode.x);
                        return targetNode.x;
                    } else {
                        return this.circlePosiX;
                    }
                })
                .attr("y2", (d) => {
                    console.log("element", d);
                    const targetNode = this.elements.find((node) => node.id === d.target);
                    if (targetNode) {
                        console.log("targetNodeY", targetNode.y);
                        return targetNode.y;
                    } else {
                        return this.circlePosiY;
                    }
                });

            context.plotGroup = this.svg
                .append("g")
                .classed("plot", true);
            this.level = this.level + 0.5;
            this.circlePosiY = this.circlePosiY + 30;
            this.id++;
            // $(this.container).empty();
        }
    }

    createLinks(index: number): LinksVisualLog[] {
        const ListLinks: LinksVisualLog[] = [];
        for (let i = 0; index >= i; i++) {
            const link: LinksVisualLog = {
                source: i,
                target: i + 1,
                color: "black",
                width: 2
            };
            ListLinks.push(link);
        }
        return ListLinks;
    }
}

