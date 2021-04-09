import RuleFactory from "./RuleFactory";

class RuleApplicator {
  editor_context_string;
  elements;


  constructor(editor_context_string) {
    this.editor_context_string = editor_context_string;
    this.elements = [];
  }

  find_elements = () => {
    //Regex:  <!-- wp:paragraph --> kontent <!-- wp:paragraph -->
    const regex = new RegExp('<!-- wp:.* -->\\s*(.*)\\s*<!-- \\/wp:.* -->');
    const blocks = this.editor_context_string.split(regex);
    for (var i = 0; i < blocks.length; i++)
      if (blocks[i].trim() != '')
        this.elements.push(
          {
            'text': blocks[i],
            'element': jQuery(blocks[i]),
            'failed_rules': []
          },
        )

  }

  apply_rules = () => {
    const rules = RuleFactory.getRules();
    for (var i = 0; i < this.elements; i++) {
      for (var j = 0; j < rules.length; j++) {
        const rule = new rules[j](this.elements[i]);
        rule.run();
      }
    }
  }

}

export default RuleApplicator;
