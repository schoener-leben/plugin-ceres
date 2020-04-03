import Vue from "vue";
import "owl.carousel";

Vue.component("category-image-carousel", {

    delimiters: ["${", "}"],

    props: {
        imageUrlsData:
        {
            type: Array
        },
        itemUrl:
        {
            type: String
        },
        altText:
        {
            type: String
        },
        titleText:
        {
            type: String
        },
        showDots:
        {
            type: Boolean,
            default: App.config.item.categoryShowDots
        },
        showNav:
        {
            type: Boolean,
            default: App.config.item.categoryShowNav
        },
        disableLazyLoad: {
            type: Boolean,
            default: false
        },
        disableCarouselOnMobile:
        {
            type: Boolean
        },
        enableCarousel:
        {
            type: Boolean
        },
        template:
        {
            type: String
        }
    },

    data()
    {
        return {
            $_enableCarousel: false
        };
    },

    computed:
    {
        imageUrls()
        {
            return this.imageUrlsData.sort((imageUrlA, imageUrlB) =>
            {
                if (imageUrlA.position > imageUrlB.position)
                {
                    return 1;
                }
                if (imageUrlA.position < imageUrlB.position)
                {
                    return -1;
                }

                return 0;
            });
        }
    },

    created()
    {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const shouldCarouselBeEnabled = this.enableCarousel && this.imageUrls.length > 1;

        this.$_enableCarousel = this.disableCarouselOnMobile && isMobile ? false : shouldCarouselBeEnabled;
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            if (this.$_enableCarousel)
            {
                this.initializeCarousel();
            }
        });
    },

    methods:
    {
        initializeCarousel()
        {
            $("#owl-carousel-" + this._uid).owlCarousel({
                dots     : !!this.showDots,
                items    : 1,
                mouseDrag: false,
                loop     : this.imageUrls.length > 1,
                lazyLoad : !this.disableLazyLoad,
                margin   : 10,
                nav      : !!this.showNav,
                navText  : [
                    `<i id="owl-nav-text-left-${this._uid}" class='fa fa-chevron-left' aria-hidden='true'></i>`,
                    `<i id="owl-nav-text-right-${this._uid}" class='fa fa-chevron-right' aria-hidden='true'></i>`
                ],
                onTranslated(event)
                {
                    const element = event.target.querySelector(".owl-item.active img");

                    if (element && element.dataset.src && !element.src)
                    {
                        element.src = element.dataset.src;
                        element.removeAttribute("data-src");
                    }
                },
                onInitialized: event =>
                {
                    if (this.showNav)
                    {
                        document.querySelector(`#owl-nav-text-left-${this._uid}`).parentElement.onclick = event => event.preventDefault();
                        document.querySelector(`#owl-nav-text-right-${this._uid}`).parentElement.onclick = event => event.preventDefault();
                    }
                }
            });
        },

        getAltText(image)
        {
            const altText = image && image.alternate ? image.alternate : this.altText;

            return altText;
        },

        getImageName(image)
        {
            const altText = image && image.name ? image.name : this.titleText;

            return altText;
        }
    }
});
