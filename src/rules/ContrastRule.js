import ARule from "./AbstractRule";


class ContrastRule extends ARule {
    error_description = "contr rule"

    _run = () => {
        console.log('contrast rule')
    }
}


export default ContrastRule;


