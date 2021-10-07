var oldconsole = console;

class NewConsole {
  constructor() {
    this.countMap = new Map();
  }

  a() {}

  hasFormatSpecifiers(first) {
    return Object.values(first).reduce(
      (p, c) => {
        return [
          c === "%",
          p[1] ||
            (p[0] &&
              (c === "s" ||
                c === "d" ||
                c === "i" ||
                c === "f" ||
                c === "o" ||
                c === "0")),
        ];
      },
      [false, false]
    )[1];
  }

  printer(logLevel, args) {
    let argsStr = Object.values(args).reduce((p, c) => {
      return p + " " + c;
    }, "");

    document.getElementById("log").innerHTML +=
      "[" + logLevel + "] " + argsStr + "<br>";
  }

  formatter(args) {
    let target = args[0];
    let current = args[1];
    let result = args.filter((e, i) => {
      return i > 1;
    });
    let specifierPos =
      Object.values(target).reduce(
        (p, c) => {
          return [
            c === "%",
            p[1] ||
              (p[0] &&
                (c === "s" ||
                  c === "d" ||
                  c === "i" ||
                  c === "f" ||
                  c === "o" ||
                  c === "0")),
            p[2] + (p[1] ? 0 : 1),
          ];
        },
        [false, false, 0]
      )[2] - 2;
    let specifier = Object.values(target)
      .splice(specifierPos, 2)
      .reduce((p, c) => {
        return p + c;
      }, "");
    let converted;
    switch (specifier) {
      case "%s":
        converted = String(current);
        break;
      case "%d":
      case "%i":
        if (typeof current === "symbol") {
          converted = NaN;
        } else {
          converted = parseInt(current, 10);
        }
        break;
      case "%f":
        if (typeof current === "symbol") {
          converted = NaN;
        } else {
          converted = parseFloat(current);
        }
        break;
      case "%o":
        converted = current;
        break;
      case "%0":
        converted = current;
        break;
      default:
        converted = current;
        break;
    }
    target =
      Object.values(target)
        .splice(0, specifierPos)
        .reduce((p, c) => {
          return p + c;
        }, "") +
      converted +
      Object.values(target)
        .splice(specifierPos + 2)
        .reduce((p, c) => {
          return p + c;
        }, "");
    result.unshift(target);
    /*this.printer("formatter", ["target:", target]);
    this.printer("formatter", ["current:", current]);
    this.printer("formatter", ["Type(current):", typeof current]);
    this.printer("formatter", ["specifierPos:", specifierPos]);
    this.printer("formatter", ["specifier:", specifier]);
    this.printer("formatter", ["converted:", converted]);
    this.printer("formatter", ["result:", result]);
    this.printer("formatter", []);*/
    if (!this.hasFormatSpecifiers(target)) return result;
    if (result.length === 1) return result;
    return this.formatter(result);
  }

  logger(logLevel, args, options = {}) {
    if (args.length === 0) return;
    let first = args[0];
    let rest = args.filter((e, i) => {
      return i !== 0;
    });
    /*
    this.printer("logger", ["first:", first]);
    this.printer("logger", ["rest:" , rest]);
    this.printer("logger", ["rest.length:" , rest.length]);
    this.printer("logger", []);
    */
    if (rest.length === 0) {
      this.printer(logLevel, [first]);
    } else {
      if (!this.hasFormatSpecifiers(first)) {
        this.printer(logLevel, args);
      } else {
        this.printer(logLevel, this.formatter(args));
      }
    }
    return undefined;
  }

  assert(condition = false, ...data) {
    if (condition) return;
    let message = "Assertion failed";
    if (data.length === 0) {
      data.push(message);
    } else {
      let first = data[0];
      /*this.printer("assert", ["first", first]);
      this.printer("assert", ["Type(first)", typeof first]);
      this.printer("assert", ["Type(first)", typeof first === "string"]);*/
      if (typeof first !== "string") {
        data.unshift(message);
      } else {
        data[0] = message + ": " + first;
      }
    }
    this.logger("assert", data);
    oldconsole.assert(condition, data);
  }

  clear() {
    oldconsole.clear();
  }
  debug(...data) {
    this.logger("debug", data);
    oldconsole.debug(data);
  }
  error(...data) {
    this.logger("error", data);
    oldconsole.error(data);
  }
  info(...data) {
    this.logger("info", data);
    oldconsole.info(data);
  }
  log(...data) {
    this.logger("log", data);
    oldconsole.log(data);
  }
  table(tabularData, properties) {
    oldconsole.trace(tabularData, properties);
  }
  trace(...data) {
    oldconsole.trace(data);
  }
  warn(...data) {
    this.logger("warn", data);
    oldconsole.warn(data);
  }
  dir(item, options) {
    oldconsole.dir(item, options);
  }
  dirxml(...data) {
    oldconsole.dirxml(data);
  }

  count(label = "default") {
    if (this.countMap[label] !== undefined) {
      this.countMap[label]++;
    } else {
      this.countMap[label] = 1;
    }
    this.logger("count", [label + ": " + this.countMap[label]]);
    oldconsole.count(label);
  }
  countReset(label = "default") {
    if (this.countMap[label] !== undefined) {
      this.countMap[label] = 0;
    } else {
      this.logger("countReset", [
        "Label `" + label + "` does not have an associated count",
      ]);
    }
    oldconsole.countReset(label);
  }

  group(...data) {
    oldconsole.group(data);
  }
  groupCollapsed(...data) {
    oldconsole.groupCollapsed(data);
  }
  groupEnd() {
    oldconsole.groupEnd();
  }

  time(label = "default") {
    oldconsole.time(label);
  }
  timeLog(label = "default", ...data) {
    oldconsole.timeLog(label, data);
  }
  timeEnd(label = "default") {
    oldconsole.timeEnd(label);
  }
}

var console1 = new NewConsole();
console = console1;

console1.log("Line 1");
console1.log("Line 3");
console1.assert(false);
console1.assert(false, "Line 2");
console1.count();
console1.count();
console1.countReset();
console1.countReset("Line 4");
console1.log("hi");
console1.log("hi", "Test 1");
console1.log("hi", "Test 1", "Test 2");
console1.log("hi %s, hello", "Test 1", "Test 2");
console1.log("hi %d, hello", 2, "Test 2");
console1.log("hi %d, hello", "hi", "Test 2");
console1.log("hi %i, hello", 2, "Test 2");
console1.log("hi %f, hello", 2.3, "Test 2");
console1.log("hi %o, hello", { a: "b" }, "Test 2");
console1.log("hi %0, hello", { a: "b" }, "Test 2");
console1.log("hi %e, hello", "Test 1", "Test 2");
