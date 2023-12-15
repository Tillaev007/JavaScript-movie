window.addEventListener("DOMContentLoaded", () => {
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent");
  loader = document.querySelector(".loader");

  //Loader
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1500);

  //----------------------------------**************************************--------------------------------------//

  //Tabs
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }
  });

  //----------------------------------**************************************--------------------------------------//

  //Modal
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  // Function to open modal
  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  // Function to close modal
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  //To close modal
  modalCloseBtn.addEventListener("click", closeModal);

  //To close modal in another place for example outside of modal
  modal.addEventListener("click", (e) => {
    if (e.target == modal) {
      closeModal();
    }
  });

  //To close modal from keyboard
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") closeModal();
  });

  // Appearance of modal after update of site
  const modalTimerId = setTimeout(openModal, 5000);

  // To show modal during the scroll
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  //----------------------------------**************************************--------------------------------------//

  //Class

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 12000;
      this.changeToUZS();
    }

    changeToUZS() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if(this.classes.length === 0){
       this.element = 'menu__item'
      element.classList.add(this.element)
      }else{
        this.classes.forEach((classname) => element.classList.add(classname));
      }


      element.innerHTML = `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.descr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
            </div>`;

      this.parent.append(element);
    }
  }

  new MenuCard(
    "tabs.img/1.png",
    "vegy",
    ' Plan "Usual"',
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    10,
    ".menu .container",
  
  ).render();

  new MenuCard(
    "tabs.img/2.jpg",
    "elite",
    " Plan “Premium”",
    " Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?",
    15,
    ".menu .container",
    "menu__item"
  ).render();

  new MenuCard(
    "tabs.img/3.jpg",
    "post",
    ' Plan "VIP"',
    " Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?",
    20,
    ".menu .container",
    "menu__item"
  ).render();
});
