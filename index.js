console.log("Initializing script");

class MSymbol {
  constructor(toString) {
    this.termString = toString;
  }
}

class MVariable extends MSymbol {
  constructor(name) {
    super(function () {
      return this.name;
    });
    this.name = name;
  }
}

class MQuantifier extends MSymbol {
  constructor(toString) {
    super(toString);
  }
}

class MLogicalConnective extends MSymbol {
  constructor(toString) {
    super(toString);
  }
}

class MPredicate extends MSymbol {
  constructor(toString, arity) {
    super(toString);
    this.arity = arity;
  }
}

class MFunction extends MSymbol {
  constructor(toString, arity) {
    super(toString);
    this.arity = arity;
  }
}

class MTerm {}

class MVariableTerm extends MTerm {
  constructor(variable) {
    super();
    this.variable = variable;
  }
}

class MFunctionTerm extends MTerm {
  constructor(function1, ...terms) {
    super();
    if (terms.length !== function1.arity) throw Exception();
    this.function1 = function1;
    this.terms = terms;
  }
}

var universal_quantification = new MQuantifier(function () {
  return "∀";
});

var existential_quantification = new MQuantifier(function () {
  return "∃";
});

var conjunction = new MLogicalConnective(function () {
  return "∧";
});

var disjunction = new MLogicalConnective(function () {
  return "∧";
});

var implication = new MLogicalConnective(function () {
  return "∧";
});

var biconditional = new MLogicalConnective(function () {
  return "∧";
});

var negation = new MLogicalConnective(function () {
  return "∧";
});

var x = new MVariable("x");
var xTerm = new MVariableTerm(x);

var function1 = new MFunction(function () {
  return "f";
}, 1);

var functionTerm = new MFunctionTerm(function1, xTerm);

var equals = new MSymbol(function () {
  return "=";
});

console.log(equals);
console.log(x);
console.log(xTerm);
console.log(universal_quantification);
