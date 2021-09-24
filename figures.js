function color(col){
    switch (col){
        case 1:
            r = 200;
            g = 0;
            b = 0;
            break;

        case 2: //lime
            r = 0;
            g = 200;
            b = 0;
            break;

        case 3:
            r = 0;
            g = 0;
            b = 200;
            break;

        case 4: //yellow
            r = 255;
            g = 255;
            b = 0;
            break;

        case 5: //aqua
            r = 0;
            g = 255;
            b = 255;
            break;

        case 6: //purple
            r = 128;
            g = 0;
            b = 128;
            break;

        case 7: //green
            r = 0;
            g = 128;
            b = 0;
            break;

        case 8: //olive
            r = 128;
            g = 128;
            b = 0;
            break;

        case 9: //maroon (red)
            r = 128;
            g = 0;
            b = 0;
            break;

        case 10: //navy (blue)
            r = 0;
            g = 0;
            b = 128;
            break;

        default:
            r = 255;
            g = 255;
            b = 255;
            break;
    }
}

function figure1(col){
    next_figure.push(Math.round(xm/2));
    next_figure.push(0);
    next_figure.push(Math.round(xm/2) + 1);
    next_figure.push(0);
    next_figure.push(Math.round(xm/2));
    next_figure.push(1);
    next_figure.push(Math.round(xm/2) + 1);
    next_figure.push(1);
    next_figure.push(1);
    color(col);
    rgb_next_figure.push(r);
    rgb_next_figure.push(g);
    rgb_next_figure.push(b);
    rgb_next_figure.push(col);
}

function figure2(col){
    next_figure.push(Math.round(xm/2) - 2);
    next_figure.push(0);
    next_figure.push(Math.round(xm/2) - 1);
    next_figure.push(0);
    next_figure.push(Math.round(xm/2));
    next_figure.push(0);
    next_figure.push(Math.round(xm/2) + 1);
    next_figure.push(0);
    next_figure.push(2);
    color(col);
    rgb_next_figure.push(r);
    rgb_next_figure.push(g);
    rgb_next_figure.push(b);
    rgb_next_figure.push(col);
}

function figure3(col){
    next_figure.push(Math.round(xm/2) - 1);
    next_figure.push(0);
    next_figure.push(Math.round(xm/2));
    next_figure.push(0);
    next_figure.push(Math.round(xm/2) + 1);
    next_figure.push(0);
    next_figure.push(Math.round(xm/2));
    next_figure.push(1);
    next_figure.push(3); //figure number
    color(col);
    rgb_next_figure.push(r);
    rgb_next_figure.push(g);
    rgb_next_figure.push(b);
    rgb_next_figure.push(col);
}

function figure4(col) {
    next_figure.push(Math.round(xm / 2) - 1);
    next_figure.push(0);
    next_figure.push(Math.round(xm / 2) - 1);
    next_figure.push(1);
    next_figure.push(Math.round(xm / 2) - 1);
    next_figure.push(2);
    next_figure.push(Math.round(xm / 2));
    next_figure.push(2);
    next_figure.push(4);
    color(col);
    rgb_next_figure.push(r);
    rgb_next_figure.push(g);
    rgb_next_figure.push(b);
    rgb_next_figure.push(col);
}

function figure5(col){
    next_figure.push(Math.round(xm/2));
    next_figure.push(0);
    next_figure.push(Math.round(xm/2));
    next_figure.push(1);
    next_figure.push(Math.round(xm/2));
    next_figure.push(2);
    next_figure.push(Math.round(xm/2) - 1);
    next_figure.push(2);
    next_figure.push(5);
    color(col);
    rgb_next_figure.push(r);
    rgb_next_figure.push(g);
    rgb_next_figure.push(b);
    rgb_next_figure.push(col);
}

function figure6(col){
    next_figure.push(Math.round(xm/2)-1);
    next_figure.push(0);
    next_figure.push(Math.round(xm/2)-1);
    next_figure.push(1);
    next_figure.push(Math.round(xm/2));
    next_figure.push(1);
    next_figure.push(Math.round(xm/2));
    next_figure.push(2);
    next_figure.push(6);
    color(col);
    rgb_next_figure.push(r);
    rgb_next_figure.push(g);
    rgb_next_figure.push(b);
    rgb_next_figure.push(col);
}

function figure7(col){
    next_figure.push(Math.round(xm/2));
    next_figure.push(0);
    next_figure.push(Math.round(xm/2));
    next_figure.push(1);
    next_figure.push(Math.round(xm/2)-1);
    next_figure.push(1);
    next_figure.push(Math.round(xm/2)-1);
    next_figure.push(2);
    next_figure.push(7);
    color(col);
    rgb_next_figure.push(r);
    rgb_next_figure.push(g);
    rgb_next_figure.push(b);
    rgb_next_figure.push(col);
}

function changeMatrix(){
    matrix[active_figure[0]][active_figure[1]] = rgb_active_figure[3];
    matrix[active_figure[2]][active_figure[3]] = rgb_active_figure[3];
    matrix[active_figure[4]][active_figure[5]] = rgb_active_figure[3];
    matrix[active_figure[6]][active_figure[7]] = rgb_active_figure[3];
}
