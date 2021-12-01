function turnF2(){
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = 0;
    }

    if (active_figure[0] === active_figure[2]) {
        if(active_figure[0]<xm-1 && active_figure[2]<xm-1 && active_figure[4]>xm<1 && active_figure[6]<xm-1
            && active_figure[0]>1 && active_figure[2]>1 && active_figure[4]>1 && active_figure[6]>1) {
            for (let i = 0; i < 4; i++) {
                active_figure[i * 2 + 1] = active_figure[3]
            }
            active_figure[0] = active_figure[0] - 2;
            active_figure[2]--;
            active_figure[6]++;
        }
    } else {
        for (let i = 0; i < 4; i++) {
            active_figure[i * 2] = active_figure[4];
        }
        active_figure[1]--;
        active_figure[5]++;
        active_figure[7] = active_figure[7] + 2;
    }
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = rgb_active_figure[3];
    }
}

function turnF3(){
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = 0;
    }
    if(active_figure[0] === active_figure[2]){

        if(active_figure[2]<active_figure[6]) {
            active_figure[0]--;
            active_figure[1]++;
            active_figure[4]++;
            active_figure[5]--;
            active_figure[6]--;
            active_figure[7]--;
        }
        else{
            active_figure[0]--;
            active_figure[1]++;
            active_figure[4]++;
            active_figure[5]--;
            active_figure[6]++;
            active_figure[7]++;
        }

    }
    else{
        active_figure[0]++;
        active_figure[1]--;
        active_figure[4]--;
        active_figure[5]++;

        if(active_figure[3]<active_figure[7]) {
            active_figure[6]++;
            active_figure[7]--;
        }
        else{
            active_figure[6]--;
            active_figure[7]++;
        }
    }
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = rgb_active_figure[3];
    }
}

function turnF4(){
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = 0;
    }
    if(active_figure[0] === active_figure[2]){

        if(active_figure[4]<active_figure[6]) {
            if(active_figure[6]<xm-1) {
                active_figure[1]++;
                active_figure[2]++;
                active_figure[4] = active_figure[4] + 2;
                active_figure[5]--;
                active_figure[6]++;
                active_figure[7] = active_figure[7] - 2;
            }
        }
        else{
            if(active_figure[0]<xm-1) {
                active_figure[0]++;
                active_figure[1]--;
                active_figure[4]--;
                active_figure[5]++;
                active_figure[7] = active_figure[7] + 2;
            }
        }

    }
    else{

        if(active_figure[5]>active_figure[7]) {
            active_figure[0]++;
            active_figure[1]++;
            active_figure[4]--;
            active_figure[5]--;
            active_figure[6] = active_figure[6] - 2;
        }
        else{
            active_figure[0]--;
            active_figure[1]--;
            active_figure[4]++;
            active_figure[5]++;
            active_figure[6] = active_figure[6] + 2;
        }
    }
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = rgb_active_figure[3];
    }
}

function turnF5(){
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = 0;
    }
    if(active_figure[0] === active_figure[2]){

        if(active_figure[4]>active_figure[6]) {
            if(active_figure[0]<xm-1) {
                active_figure[0]--;
                active_figure[1]++;
                active_figure[4]++;
                active_figure[5]--;
                active_figure[6] = active_figure[6] + 2;
            }
        }
        else{
            if(active_figure[0]>0) {
                active_figure[0]++;
                active_figure[1]--;
                active_figure[4]--;
                active_figure[5]++;
                active_figure[6] = active_figure[6] - 2;
            }
        }
    }
    else{

        if(active_figure[5]<active_figure[7]) {
            active_figure[0]++;
            active_figure[1]++;
            active_figure[4]--;
            active_figure[5]--;
            active_figure[7] = active_figure[7] - 2;
        }
        else{
            active_figure[0]--;
            active_figure[1]--;
            active_figure[4]++;
            active_figure[5]++;
            active_figure[7] = active_figure[7] + 2;
        }
    }
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = rgb_active_figure[3];
    }
}

function turnF6(){
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = 0;
    }
    if(active_figure[0] === active_figure[2]){
        if(active_figure[4]<xm-1){
            active_figure[1]++;
            active_figure[2]++;
            active_figure[5]--;
            active_figure[6]++;
            active_figure[7] = active_figure[7] - 2;
        }
    }
    else{
        active_figure[1]--;
        active_figure[2]--;
        active_figure[5]++;
        active_figure[6]--;
        active_figure[7] = active_figure[7] + 2;
    }
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = rgb_active_figure[3];
    }
}

function turnF7(){
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = 0;
    }
    if(active_figure[0] === active_figure[2]){
        if(active_figure[0]<xm-1){
            active_figure[0]--;
            active_figure[3]--;
            active_figure[4]++;
            active_figure[6] = active_figure[6] + 2;
            active_figure[7]--;
        }
    }
    else{
        active_figure[0]++;
        active_figure[1]--;
        active_figure[4]--;
        active_figure[5]--;
        active_figure[6] = active_figure[6] - 2;
    }
    for (let i = 0; i < 4; i++) {
        matrix[active_figure[i * 2]][active_figure[i * 2 + 1]] = rgb_active_figure[3];
    }
}