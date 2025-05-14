export default function RegionList({ $app, initialState, handleRegion }) {
  this.state = initialState;
  this.handleRegion = handleRegion;
  this.$target = document.createElement("div");
  this.$target.classList.add("region-list");

  $app.appendChild(this.$target);

  this.template = () => {
    const regionList = [
      "🚀 All",
      "🌏 Asia",
      "🕌 Middle-East",
      "🇪🇺 Europe",
      "💃 Latin-America",
      "🐘 Africa",
      "🏈 North-America",
      "🏄 Oceania",
    ];
    let temp = ``;
    regionList.forEach((elm) => {
      let regionId = elm.split(" ")[1];
      temp += `<div id=${regionId}>${elm}</div>`;
    });
    return temp;
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = this.template();

    if (this.state) {
      let $currRegion = document.getElementById(this.state);
      $currRegion && $currRegion.classList.add("clicked");
    } else {
      document.getElementById("All").classList.add("clicked");
    }

    const $regionList = this.$target.querySelectorAll("div");
    $regionList.forEach((elm) => {
      elm.addEventListener("click", () => {
        this.handleRegion(elm.id);
      });
    });
  };

  this.render();
}
