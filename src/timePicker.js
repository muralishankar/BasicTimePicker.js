export class TimePicker {
  constructor(targetElement, properties, events) {
    this.element = targetElement;
    this.meridiemValue = "AM";
    this.timeValue = "00:00 AM";
    this.componentValues = {};
    this.events = events;
    this.htmlContent =
      "<div class='o-time-picker'> <div class='o-time-hour'>" +
      "<div><button class='o-hour-inc'>&#11014;</button> </div><div><input value='00' class='o-hour-input' />: :</div>" +
      "<div><button class='o-hour-dec'>&#11015;</button></div></div>" +
      "<div class='o-time-minute'><div><button class='o-min-inc'>&#11014;</button> </div><div><input value='00' class='o-min-input' /></div><div>" +
      "<button class='o-min-dec'>&#11015;</button></div></div>" +
      "<div class='o-time-meridiem'><div class='o-meridiem-container'><button class='o-selected' value='am'>AM</button><button value='pm'>PM</button></div>" +
      "</div></div>";
    this.renderComponent(targetElement);
    this.meridiemValueChange = this.meridiemValueChange.bind(this);
    this.increaseInput = this.increaseInput.bind(this);
    this.decreaseInput = this.decreaseInput.bind(this);
    this.inputValueChange = this.inputValueChange.bind(this);
    this.bindEvents();
    this.getCorrectValue = (type, value) =>
      type ? (value > 12 ? 12 : value) : value > 59 ? 59 : value;
  }

  updateProperty(properties, events) {
    // to update the properties and evetns
  }
  removeComponent() {
    this.unbindEvents();
    this.element.innerHTML = "";
  }
  unbindEvents() {
    let minInput = this.element.querySelectorAll(".o-min-input")[0],
      hourInput = this.element.querySelectorAll(".o-hour-input")[0],
      hourInc = this.element.querySelectorAll(".o-hour-inc")[0],
      hourDec = this.element.querySelectorAll(".o-hour-dec")[0],
      minInc = this.element.querySelectorAll(".o-min-inc")[0],
      minDec = this.element.querySelectorAll(".o-min-dec")[0],
      meridiem = this.element.querySelectorAll(".o-time-meridiem button");
    minInput.removeEventListener("keydown", this.inputValueChange);
    hourInput.removeEventListener("keydown", this.inputValueChange);
    hourInc.removeEventListener("click", this.increaseInput);
    hourDec.removeEventListener("click", this.decreaseInput);
    minDec.removeEventListener("click", this.decreaseInput);
    minInc.removeEventListener("click", this.increaseInput);
    meridiem.forEach((item) => {
      item.removeEventListener("click", this.meridiemValueChange);
    });
  }
  bindEvents() {
    let minInput = this.element.querySelectorAll(".o-min-input")[0],
      hourInput = this.element.querySelectorAll(".o-hour-input")[0],
      hourInc = this.element.querySelectorAll(".o-hour-inc")[0],
      hourDec = this.element.querySelectorAll(".o-hour-dec")[0],
      minInc = this.element.querySelectorAll(".o-min-inc")[0],
      minDec = this.element.querySelectorAll(".o-min-dec")[0],
      meridiem = this.element.querySelectorAll(".o-time-meridiem button");
    minInput.addEventListener("keyup", this.inputValueChange.bind(this));
    hourInput.addEventListener("keyup", this.inputValueChange.bind(this));
    hourInc.addEventListener("click", this.increaseInput.bind(this));
    hourDec.addEventListener("click", this.decreaseInput.bind(this));
    minDec.addEventListener("click", this.decreaseInput.bind(this));
    minInc.addEventListener("click", this.increaseInput.bind(this));
    meridiem.forEach((item) => {
      item.addEventListener("click", this.meridiemValueChange);
    });
  }
  inputValueChange(event) {
    let value = event.target.value;
    let hourInc = event.target.classList.contains("o-hour-inc");
    value = this.getCorrectValue(hourInc, value);
    event.target.value = ("0" + value).slice(-2);
    this.updateProperValue();
  }
  increaseInput(event) {
    let hourInc = event.target.classList.contains("o-hour-inc"),
      //minInc = event.target.classList.contains("o-min-inc"),
      minInput = this.element.querySelectorAll(".o-min-input")[0],
      hourInput = this.element.querySelectorAll(".o-hour-input")[0];

    let inputElement = hourInc ? hourInput : minInput;
    let value = parseInt(inputElement.value);
    value++;
    value = this.getCorrectValue(hourInc, value);
    inputElement.value = ("0" + value).slice(-2);
    this.updateProperValue();
  }
  decreaseInput(event) {
    let hourInc = event.target.classList.contains("o-hour-dec"),
      //minInc = event.target.classList.contains("o-min-inc"),
      minInput = this.element.querySelectorAll(".o-min-input")[0],
      hourInput = this.element.querySelectorAll(".o-hour-input")[0];

    let inputElement = hourInc ? hourInput : minInput;
    let value = parseInt(inputElement.value);
    value--;
    value = value < 0 ? 0 : value;
    inputElement.value = ("0" + value).slice(-2);
    this.updateProperValue();
  }
  updateProperValue() {
    let minInput = this.element.querySelectorAll(".o-min-input")[0],
      hourInput = this.element.querySelectorAll(".o-hour-input")[0];
    let new_value =
      hourInput.value + ":" + minInput.value + " " + this.meridiemValue;
    if (this.timeValue !== new_value) {
      this.timeValue = new_value;
      if (this.events.valueChange) {
        this.events.valueChange(this.timeValue);
      }
    }
  }
  meridiemValueChange(event) {
    let meridiem = this.element.querySelectorAll(".o-time-meridiem button");
    meridiem.forEach((item) => {
      item.classList.remove("o-selected");
    });
    this.meridiemValue = event.target.value === "am" ? "AM" : "PM";
    event.target.classList.add("o-selected");
    this.updateProperValue();
  }
  renderComponent(element) {
    let mainElement = document.createElement("div");
    mainElement.innerHTML = this.htmlContent;
    element.append(mainElement.children[0]);
  }
}
