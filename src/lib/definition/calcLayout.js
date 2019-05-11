import {SIZE, TYPE, POS, calcBtnSize, allocateBtn, calcBottomCount, 
    optimizeSideBtn, createSideEmpty, sortSideBtn, optimizeBottomBtn, createBottomEmpty, 
    sortBottomBtn} from '../functions/func.js';

//ボタンレイアウトを割り出すクラス
const CalcLayout = class {

    constructor(modes, funcs, params, recommendedFuncs) {
        this.modeNum = modes.length;
        this.funcNum = funcs.length;
        this.paramNum = params.length;
        this.recommendedFuncNum = recommendedFuncs.length;
        this.btnLists = [];
        this.bottomBtnLists = [];
        this.sideBtnLists = [];

        //選択されたモードや機能をボタンリスト配列に格納する
        modes.forEach(ele => {
            this.btnLists.push({ label: ele, type: TYPE.MODE });
        });
        funcs.forEach(ele => {
            this.btnLists.push({ label: ele, type: TYPE.FUNC });
        });
        params.forEach(ele => {
            this.btnLists.push({ label: ele, type: TYPE.PARAM });
        });
        recommendedFuncs.forEach(ele => {
            this.btnLists.push({ label: ele, type: TYPE.RECFUNC });
        });

        //ボタンのサイズを算出する
        calcBtnSize(this.btnLists, this.modeNum, this.funcNum, this.paramNum, this.recommendedFuncNum);

        //エラー処理(いずれ消す)
        if(calcBottomCount(this.btnLists) > 25){
            alert('error');
        }

        //ボタンを振り分け、side用とbottom用の配列に配分する
        allocateBtn(this.btnLists, this.paramNum);
        
        this.btnLists.forEach(ele => {
            if(ele.pos === POS.BOTTOM){
                this.bottomBtnLists.push(ele);
            }
            else{
                this.sideBtnLists.push(ele);
            }
        });

        //sideボタンのサイズを最適化する
        optimizeSideBtn(this.sideBtnLists);

        //sideボタンに空白ボタン生成
        createSideEmpty(this.sideBtnLists);

        //sideボタン並び変え
        sortSideBtn(this.sideBtnLists);

        //bottomボタンのサイズを最適化する
        optimizeBottomBtn(this.bottomBtnLists);

        //bottomボタンに空白ボタン生成
        createBottomEmpty(this.bottomBtnLists);

        //bottomボタン並び変え
        sortBottomBtn(this.bottomBtnLists);

    }
};

export default CalcLayout