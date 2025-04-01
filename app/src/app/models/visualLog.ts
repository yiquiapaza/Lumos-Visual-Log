export const enum VisualizationElement {
    CIRCLE = "circle",
    RECT = "rect",
    LINE = "line",
}

export interface NodeVisualLog {
    plotType?: string;
    xVar?: string;
    yVar?: string;
    element?: string;
}

export interface GraphVisualLog {
    plotType: string;
    xVar: string;
    yVar: string;
    element: string;
    radio: number;
    x: number;
    y: number;
    color: string;
    level: number;
}
