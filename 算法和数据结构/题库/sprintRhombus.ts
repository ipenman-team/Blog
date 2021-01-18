
function sprint(num: number) {
    for (let i = 1; i < num; i++) {
        let str = ""
        for (let j = i; j < num; j++) {
            str += " "
        }

        for (let k = 0; k < i; k++) {
            if (k > 0 && k < i - 1) {
                str += "  "
            } else {
                str += "* "
            }
        }

        console.log(str)
    }

    for (let i = 1; i < num - 1; i++) {
        let str = ""
        for (let k = 0; k < i; k++) {
            str += " "
        }

        for (let j = i; j < num - 1; j++) {
            if (j > i && j < num - 2) {
                str += "  "
            } else
                str += " *"
        }

        console.log(str)
    }
}

sprint(12)
