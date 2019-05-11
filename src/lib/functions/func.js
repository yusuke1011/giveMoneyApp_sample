//列挙体の定義
export const SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    EMPTY: 'empty'
};
export const TYPE = {
    MODE: 1,
    FUNC: 2,
    PARAM: 3,
    RECFUNC: 4,
    EMPTY: 5
}
export const POS = {
    BOTTOM: 1,
    SIDE: 2
}

//ボタンリストからボタンのサイズを決定する関数
export const calcBtnSize = (btnLists, _modeNum, _funcNum, _paramNum, _recommendedFuncNum) => {
    console.log('---------サイズ---------');

    //合計数を算出する（paramは必ずサイズ大のため、×２しておく）
    const sum = _modeNum + _funcNum + 2*_paramNum + _recommendedFuncNum;

    let countForSize = 1.5;
    if(sum === 24){
        console.log('sum=24', sum)
        btnLists.forEach(ele => {
            if(ele.label === '必須モード1' || ele.label === '必須機能1'){
                ele.size = SIZE.MEDIUM;
            }
            else if (ele.type === TYPE.PARAM){
                ele.size = SIZE.LARGE;
            }
            else{
                ele.size = SIZE.SMALL;
            }
        });
    }
    else if(sum < 24){
        console.log('sum<24', sum);
        btnLists.forEach(ele => {
            if(1.5*(_modeNum-1) + _funcNum-1 + 2*_paramNum + _recommendedFuncNum >= 21.5){
                console.log('条件１', 1.5*(_modeNum-1) + _funcNum-1 + 2*_paramNum + _recommendedFuncNum, '>=21.5')

                if(ele.label === '必須モード1'){
                    ele.size = SIZE.LARGE;
                }
                else if(ele.label === '必須機能1'){
                    ele.size = SIZE.MEDIUM
                }
                else if (ele.type === TYPE.PARAM){
                    ele.size = SIZE.LARGE;
                }
                else if(countForSize < (23.5 - sum) * 3 / 2){
                    console.log('countForSize', countForSize, '<', (23.5 - sum) * 3 / 2)
                    ele.size = SIZE.MEDIUM;
                    countForSize += 1.5;
                }
                else{
                    console.log('countForSize', countForSize, '>=', (23.5 - sum) * 3 / 2)
                    ele.size = SIZE.SMALL;
                    countForSize += 1.5;
                }
            }
            else if(1.5*(_modeNum-1) + _funcNum-1 + 2*_paramNum + _recommendedFuncNum < 21.5){
                console.log('条件１', 1.5*(_modeNum-1) + _funcNum-1 + 2*_paramNum + _recommendedFuncNum, '<21.5');

                if(1.5*(_modeNum-1 + _funcNum-1 + _recommendedFuncNum) + 2*_paramNum >= 21.5){
                    console.log('条件２', 1.5*(_modeNum-1 + _funcNum-1 + _recommendedFuncNum) + 2*_paramNum, '>=21.5');
                    
                    if(ele.label === '必須モード1'){
                        ele.size = SIZE.LARGE;
                    }
                    else if(ele.label === '必須機能1'){
                        ele.size = SIZE.MEDIUM
                    }
                    else if (ele.type === TYPE.PARAM){
                        ele.size = SIZE.LARGE;
                    }
                    else if(ele.type === TYPE.MODE){
                        ele.size = SIZE.MEDIUM;
                    }
                    else{
                        if(countForSize < (21.5 - 1.5*(_modeNum-1) - 2*_paramNum - (_funcNum-1) - _recommendedFuncNum)*3){
                            console.log('countForSize：', countForSize, '<', (21.5 - 1.5*(_modeNum-1) - 2*_paramNum - (_funcNum-1) - _recommendedFuncNum)*3);
                            ele.size = SIZE.MEDIUM;
                            countForSize += 1.5;
                        }
                        else{
                            console.log('countForSize：', countForSize, '>=', (21.5 - 1.5*(_modeNum-1) - 2*_paramNum - (_funcNum-1) - _recommendedFuncNum)*3)
                            ele.size = SIZE.SMALL
                            countForSize++;
                        }
                    }
                }
                else {
                    console.log('条件２', 1.5*(_modeNum-1 + _funcNum-1 + _recommendedFuncNum) + 2*_paramNum, '<21.5');

                    if(2*(_modeNum-1) + 1.5*(_funcNum-1 + _paramNum) + 2*_paramNum > 21.5){
                        console.log('条件３', 2*(_modeNum-1) + 1.5*(_funcNum-1 + _paramNum) + 2*_paramNum, '>21.5');

                        if(ele.label === '必須モード1'){
                            ele.size = SIZE.LARGE;
                        }
                        else if(ele.label === '必須機能1'){
                            ele.size = SIZE.MEDIUM
                        }
                        else if (ele.type === TYPE.PARAM){
                            ele.size = SIZE.LARGE;
                        }
                        else{
                            ele.size = SIZE.MEDIUM
                        }
                    }
                    else if(2*(_modeNum-1) + 1.5*(_funcNum-1 + _paramNum) + 2*_paramNum === 21.5){
                        console.log('条件３', 2*(_modeNum-1) + 1.5*(_funcNum-1 + _paramNum) + 2*_paramNum, '=21.5');

                        if(ele.label === '必須モード1'){
                            ele.size = SIZE.LARGE;
                        }
                        else if(ele.label === '必須機能1'){
                            ele.size = SIZE.MEDIUM
                        }
                        else if(ele.type === TYPE.PARAM){
                            ele.size = SIZE.LARGE;
                        }
                        else if(ele.type === TYPE.MODE){
                            ele.size = SIZE.LARGE
                        }
                        else{
                            ele.size = SIZE.MEDIUM
                        }
                    }
                    else{
                        console.log('条件３', 2*(_modeNum-1) + 1.5*(_funcNum-1 + _paramNum) + 2*_paramNum, '<21.5');
                        if(ele.label === '必須モード1'){
                            ele.size = SIZE.LARGE;
                        }
                        else if(ele.label === '必須機能1'){
                            ele.size = SIZE.MEDIUM
                        }
                        else if(ele.type === TYPE.PARAM){
                            ele.size = SIZE.LARGE;
                        }
                        else if(ele.type === TYPE.MODE){
                            ele.size = SIZE.LARGE
                        }
                        else{
                            ele.size = SIZE.MEDIUM
                        }
                    }
                }
            }
            else{
                console.log('error');
            }

            console.log(ele.label, ele.size);
        });
    }
}

//ボタンリストからbottomボタンとsideボタンに振り分ける関数
export const allocateBtn = (_btnLists, _paramNum) => {
    //デバッグ用
    console.log('---------配置---------');

    let btnCount = 0;
    if(_paramNum <= 5){
        console.log('_paramNum<=5');
        _btnLists.forEach(ele => {
            if(ele.type === TYPE.PARAM){
                ele.pos = POS.SIDE;
            }
            else{
                //btnCountの計算
                if(ele.size === SIZE.SMALL){
                    btnCount += 1;
                }
                else if(ele.size === SIZE.MEDIUM){
                    btnCount += 1.5;
                }
                else{
                    btnCount += 2;
                }
                //bottomボタンに追加
                if(btnCount <= 15){
                    console.log('btnCount', btnCount, '<=', 15)
                    ele.pos = POS.BOTTOM;
                }
                //sideボタンに追加
                else{
                    console.log('btnCount', btnCount, '>', 15)
                    ele.pos = POS.SIDE;

                    //countPosを引いておく
                    if(ele.size === SIZE.SMALL){
                        btnCount -= 1;
                    }
                    else if(ele.size === SIZE.MEDIUM){
                        btnCount -= 1.5;
                    }
                    else{
                        btnCount -= 2;
                    }
                }
            }
            console.log(ele.label, ele.pos);
        });
    }
    else{
        console.log('_paramNum>5')
        _btnLists.forEach(ele => {
            if(ele.type === TYPE.PARAM){
                if(btnCount < 5){
                    console.log('btnCount', btnCount, '<', 5);
                    ele.pos = POS.SIDE;
                }
                else{
                    console.log('btnCount', btnCount, '>=', 5);
                    ele.pos = POS.BOTTOM;
                }
                btnCount++;
            }
            else{
                ele.pos = POS.BOTTOM
            }
            console.log(ele.label, ele.pos);
        });
    }
}

//ボタンの "数×サイズ" を計算する関数
export const calcBottomCount = (_btnLists) => {
    let count = 0;
    _btnLists.forEach(ele => {
        //小サイズのボタンは "1" としてカウント
        if(ele.size === SIZE.SMALL){
            count += 1;
        }
        //中サイズのボタンは "1.5" としてカウント
        else if(ele.size === SIZE.MEDIUM){
            count += 1.5;
        }
        //大サイズのボタンは "2" としてカウント
        else if(ele.size === SIZE.LARGE){
            count += 2;
        }
        else{
            if(ele.pos === POS.SIDE){
                count += 2;
            }
            else if(ele.pos === POS.BOTTOM){
                count += 1;
            }
        }
    });
    return count;
}

//sideボタンのサイズを最適化する関数
export const optimizeSideBtn = (_sideBtnLists) => {
    //デバッグ用
    console.log('---sideボタンの整理---');
    console.log('変更前', _sideBtnLists);

    let sideCount = calcBottomCount(_sideBtnLists);
    if(sideCount <= 10){
        console.log('sideCount：', sideCount, '<=10');
        _sideBtnLists.forEach(ele => {
            if(ele.size === SIZE.MEDIUM){
                sideCount += 0.5;
                if(sideCount <= 10){
                    console.log('sideCount：', sideCount, '<=10');
                    ele.size = SIZE.LARGE;
                }
                else{
                    console.log('sideCount：', sideCount, '>10');
                    ele.size = SIZE.SMALL;
                    sideCount -= 1;
                }
            }
        });
        _sideBtnLists.forEach(ele => {
            if(ele.size === SIZE.SMALL){
                sideCount += 1;
                if(sideCount <= 10){
                    console.log('sideCount：', sideCount, '<=10');
                    ele.size = SIZE.LARGE;
                }
            }
        })
    }
    else{
        console.log('sideCount：', sideCount, '>10');
        _sideBtnLists.forEach(ele => {
            if(ele.size === SIZE.MEDIUM){
                sideCount += 0.5;
                if(sideCount <= 10){
                    console.log('sideCount：', sideCount, '<=10');
                    ele.size = SIZE.LARGE;
                }
                else{
                    console.log('sideCount：', sideCount, '>10');
                    ele.size = SIZE.SMALL;
                    sideCount -= 1;
                }
            }
        });
    }
    
    //デバッグ用
    console.log('変更後', _sideBtnLists);
}

//sideボタンに空白を生成する関数
//引数の配列自体を変更する
export const createSideEmpty = (_sideBtnLists) => {
    //デバッグ用
    console.log('---sideボタンに空白ボタン生成---');
    console.log('変更前', _sideBtnLists);

    let sideCount = calcBottomCount(_sideBtnLists);
    if(sideCount <= 9){
        while(sideCount <= 9){
            console.log('sideCount：', sideCount, '<=9');
            _sideBtnLists.push({
                label: '',
                size: SIZE.EMPTY,
                pos: POS.SIDE,
                type: TYPE.EMPTY
            });
            sideCount += 2;
        }
    }
    else if(sideCount === 10){
        console.log('空白なし',sideCount);
    }
    else{
        console.log('error!!!!!!!!!!!!!!!!!!!');
    }
    _sideBtnLists.push({
        label: 'Menu',
        size: SIZE.LARGE,
        pos: POS.SIDE,
        type: TYPE.FUNC
    })
    
    //デバッグ用
    console.log('変更後', _sideBtnLists);
}

//sideボタンを並び替える関数
//引数の配列自体を変更する
export const sortSideBtn = (_sideBtnLists) => {
    //デバッグ用
    console.log('---sideボタンの並び替え---');
    console.log('変更前', _sideBtnLists);

    _sideBtnLists.forEach(ele => {
        if((ele.size === SIZE.LARGE) || (ele.size === SIZE.MEDIUM)){
            if(ele.type === TYPE.PARAM){
                ele.rank = 1;
            }
            else if(ele.label === 'Menu'){
                ele.rank = 5
            }
            else{
                ele.rank = 3;
            }
        }
        else if(ele.size === SIZE.EMPTY){
            ele.rank = 2;
        }
        else{
            ele.rank = 4;
        }
    });
    _sideBtnLists.sort((ele1, ele2) => {
        return ele1.rank - ele2.rank;
    })
    
    //デバッグ用
    console.log('変更後', _sideBtnLists);
} 

//bottomボタンのサイズを最適化する関数
export const optimizeBottomBtn = (_bottomBtnLists) => {
    //デバッグ用
    console.log('---bottomボタンの整理---');
    console.log('変更前', _bottomBtnLists);

    let bottomCount = calcBottomCount(_bottomBtnLists);
    if(bottomCount < 15){
        console.log('bottomCount：', bottomCount, '<15');
        _bottomBtnLists.forEach(ele => {
            if(ele.size === SIZE.SMALL){
                bottomCount += 0.5;
                if(bottomCount <= 15){
                    console.log('bottomCount：', bottomCount, '<=15');
                    ele.size = SIZE.MEDIUM;
                }
            }
        });
    }
    else if(bottomCount === 15){
        console.log('整理の必要なし');
    }
    else{
        console.log('error!!!!!!!!!', bottomCount, '>15');
    }

    //デバッグ用
    console.log('変更後', _bottomBtnLists);
}

//bottomボタンに空白を生成する関数
//引数の配列自体を変更する
export const createBottomEmpty = (_bottomBtnLists) => {
    //デバッグ用
    console.log('---bottomボタンに空白ボタン生成---');
    console.log('変更前', _bottomBtnLists);

    let bottomEmptyCount = 0; 
    let bottomCount = calcBottomCount(_bottomBtnLists);
    if(bottomCount <= 14){
        while(bottomCount <= 14){
            console.log('bottomCount：', bottomCount, '<=14');
            bottomEmptyCount++;
            _bottomBtnLists.push({
                label: '空白' + String(bottomEmptyCount),
                size: SIZE.EMPTY,
                pos: POS.BOTTOM,
                type: TYPE.EMPTY
            });
            bottomCount++;
        }
    }
    else if(bottomCount === 15){
        console.log('空白なし', bottomCount);
    }
    else{
        console.log('error!!!!!!!!!!!!!!!!!!!');
    }

    //デバッグ用
    console.log('変更後', _bottomBtnLists);
}

//bottomボタンを並び替える関数
//引数の配列自体を変更する
export const sortBottomBtn = (_bottomBtnLists) => {
    //デバッグ用
    console.log('---bottomボタンの並び替え---');
    console.log('変更前', _bottomBtnLists);

    _bottomBtnLists.forEach(ele => {
        if(ele.type === TYPE.PARAM){
            ele.rank = 1;
        }
        else if(ele.label === '空白3'){
            ele.rank = 2;
        }
        else if(ele.type === TYPE.RECFUNC){
            ele.rank = 3;
        }
        else if(ele.type === TYPE.FUNC){
            if(ele.label === '機能1'){
                ele.rank = 10;
            }
            else if(ele.label === '必須機能1'){
                ele.rank = 11;
            }
            else{
                ele.rank = 4;
            }
        }
        else if(ele.label === '空白2'){
            ele.rank = 5;
        }
        else if(ele.type === TYPE.MODE){
            if(ele.label === '必須モード1'){
                ele.rank = 8;
            }
            else{
                ele.rank = 6;
            }
        }
        else if(ele.label === '空白4'){
            ele.rank = 7;
        }
        else if(ele.label === '空白1'){
            ele.rank = 9;
        }
        else{
            ele.rank = 2;
        }
    });
    _bottomBtnLists.sort((ele1, ele2) => {
        return ele1.rank - ele2.rank;
    });

    //デバッグ用
    console.log('変更後', _bottomBtnLists);
} 