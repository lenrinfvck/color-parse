(function() {
    class ColorParse {
        /**
         * 构造函数
         * @param  {[Str, Obj, Arr]} inputColor [支持的颜色格式]
         * @param  {Str} type [可以是'rgb','rgba','hsl','hsla']
         * @return {Obj} [ColorParse实例]
         */
        constructor(inputColor, type) {
            if(typeof inputColor === 'string') {
                inputColor = inputColor.replace(/\s/g, '');
                this._inputColor = inputColor;
                this._parse(inputColor);
            }else if(type) {
                this._parse(this._fillString(inputColor, type));
            }
        }
        /**
         * 提供静态方法构造对象
         * @param  {[Str, Obj, Arr]} inputColor [支持的颜色格式]
         * @param  {Str} type [可以是'rgb','rgba','hsl','hsla']
         * @return {Obj} [ColorParse实例]
         */
        static get(inputColor, type) {
            return new ColorParse(inputColor, type);
        }
        /**
         * 输入颜色为Array和Object的补全为String
         * @param  {[Obj, Arr]} inputColor [支持的颜色格式]
         * @param  {Str} type [可以是'rgb','rgba','hsl','hsla']
         * @return {Str} [补全后的字符串]
         */
        _fillString(inputColor, type) {
            if(['rgb', 'rgba', 'hsl', 'hsla'].indexOf(type) < 0) {
                return false;
            }
            if(inputColor instanceof Array) {
                return type + '(' + inputColor.join() + ')';
            }
            if(inputColor instanceof Object) {
                let keys = type.split('');
                let res = [];
                for(let i of keys) {
                    res.push(inputColor[i] || 0);
                }
                return type + '(' + res.join() + ')';
            }
            return '';
        }
        /**
         * 解析颜色字符串
         * @param  {Str} inputColor [支持的颜色格式字符串]
         * @return {pbj} null
         */
        _parse(inputColor) {
            let input = inputColor;
            let type = this.getType(inputColor);
            console.log('type:', type);
        }

        getType(inputColor) {
            let regList = {
                hex: /^#?((([0-9]|[a-f]){3})|(([0-9]|[a-f]){6}))$/i,
                rgb: /^rgba?\((\d+,){2,3}\d+\)/i,
                hsl: /^hlsa?\((\d+,){2,3}\d+\)/i
            };
            for(let type in regList) {
                if(regList[type].test(inputColor)) {
                    return type;
                }
            }
            return false;
        }
    }
    window.ColorParse = ColorParse;
})(window);