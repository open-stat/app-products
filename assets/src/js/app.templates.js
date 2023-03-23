//HEAD 
window["appTemplates"] = {};

window["appTemplates"]["page-menu/loader"] = "<div id=\"loader\">\n" +
    "  <div role=\"progressbar\" class=\"mdc-linear-progress loader-progress\" aria-label=\"Example Progress Bar\" aria-valuemin=\"0\" aria-valuemax=\"1\" aria-valuenow=\"0\">\n" +
    "    <div class=\"mdc-linear-progress__buffer\">\n" +
    "      <div class=\"mdc-linear-progress__buffer-bar\"></div>\n" +
    "      <div class=\"mdc-linear-progress__buffer-dots\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"mdc-linear-progress__bar mdc-linear-progress__primary-bar\">\n" +
    "      <span class=\"mdc-linear-progress__bar-inner\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"mdc-linear-progress__bar mdc-linear-progress__secondary-bar\">\n" +
    "      <span class=\"mdc-linear-progress__bar-inner\"></span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"loader-block\"></div>\n" +
    "</div>"; 

window["appTemplates"]["page-menu/main"] = "\n" +
    "<header>\n" +
    "    <h4>Каталог товаров</h4>\n" +
    "    <div>\n" +
    "        <button type=\"button\" class=\"btn btn-lg btn-tertiary btn-floating material-icons install-button\" style=\"display: none\">\n" +
    "            mobile_friendly\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</header>\n" +
    "\n" +
    "<div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane fade show active\" id=\"menu-content-catalog\"></div>\n" +
    "    <div class=\"tab-pane fade\" id=\"menu-content-cart\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<ul class=\"nav nav-tabs nav-justified\">\n" +
    "    <li class=\"nav-item\">\n" +
    "        <a class=\"nav-link active ripple\" id=\"menu-tab-catalog\" href=\"#menu-content-catalog\" data-mdb-toggle=\"tab\" data-mdb-ripple-color=\"#48a564\">\n" +
    "            <div>\n" +
    "                <i class=\"fa fa-folder-open fa-fw mb-2\"></i>\n" +
    "            </div>\n" +
    "            Каталог\n" +
    "        </a>\n" +
    "    </li>\n" +
    "    <li class=\"nav-item\">\n" +
    "        <a class=\"nav-link ripple\" id=\"menu-tab-cart\" href=\"#menu-content-cart\" data-mdb-toggle=\"tab\" data-mdb-ripple-color=\"#48a564\">\n" +
    "            <div>\n" +
    "                <i class=\"fa fa-cart-shopping fa-fw mb-2\"></i>\n" +
    "            </div>\n" +
    "            Корзина\n" +
    "        </a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    ""; 

window["appTemplates"]["page-menu/preloader"] = "<div id=\"preloader\">\n" +
    "    <div class=\"loading-lock\"></div>\n" +
    "    <div class=\"loading-block\">\n" +
    "        <div class=\"mdc-circular-progress\" style=\"width:96px;height:48px;\" role=\"progressbar\" aria-label=\"Example Progress Bar\" aria-valuemin=\"0\" aria-valuemax=\"1\">\n" +
    "            <div class=\"mdc-circular-progress__determinate-container\">\n" +
    "                <svg class=\"mdc-circular-progress__determinate-circle-graphic\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                    <circle class=\"mdc-circular-progress__determinate-track\" cx=\"24\" cy=\"24\" r=\"18\" stroke-width=\"4\"/>\n" +
    "                    <circle class=\"mdc-circular-progress__determinate-circle\" cx=\"24\" cy=\"24\" r=\"18\" stroke-dasharray=\"113.097\" stroke-dashoffset=\"113.097\" stroke-width=\"4\"/>\n" +
    "                </svg>\n" +
    "            </div>\n" +
    "            <div class=\"mdc-circular-progress__indeterminate-container\">\n" +
    "                <div class=\"mdc-circular-progress__spinner-layer\">\n" +
    "                    <div class=\"mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left\">\n" +
    "                        <svg class=\"mdc-circular-progress__indeterminate-circle-graphic\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                            <circle cx=\"24\" cy=\"24\" r=\"18\" stroke-dasharray=\"113.097\" stroke-dashoffset=\"56.549\" stroke-width=\"4\"/>\n" +
    "                        </svg>\n" +
    "                    </div>\n" +
    "                    <div class=\"mdc-circular-progress__gap-patch\">\n" +
    "                        <svg class=\"mdc-circular-progress__indeterminate-circle-graphic\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                            <circle cx=\"24\" cy=\"24\" r=\"18\" stroke-dasharray=\"113.097\" stroke-dashoffset=\"56.549\" stroke-width=\"3.2\"/>\n" +
    "                        </svg>\n" +
    "                    </div>\n" +
    "                    <div class=\"mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right\">\n" +
    "                        <svg class=\"mdc-circular-progress__indeterminate-circle-graphic\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                            <circle cx=\"24\" cy=\"24\" r=\"18\" stroke-dasharray=\"113.097\" stroke-dashoffset=\"56.549\" stroke-width=\"4\"/>\n" +
    "                        </svg>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"loading-text\"><%= text %></div>\n" +
    "    </div>\n" +
    "</div>"; 

window["appTemplates"]["page-menu/cart/list"] = "\n" +
    "<% if (filters.length > 0) { %>\n" +
    "    <div class=\"cart_shops\">\n" +
    "        <% $.each(shops, function(key, shop) { %>\n" +
    "        <div class=\"card rounded-0 cart_shop cart_shop-<%= shop.name %>\">\n" +
    "            <div class=\"card-header rounded-0 d-flex justify-content-between align-items-center\">\n" +
    "                <div>\n" +
    "                    <div class=\"cart_shop__title fw-bold\"><%= shop.title %></div>\n" +
    "                    <div class=\"cart_shop__count-found text-muted\">\n" +
    "                        <span>Найдено товаров:</span>\n" +
    "                        <span class=\"cart_shop__count-found__number\">\n" +
    "                            <span class=\"cart_shop__count-found__number_found\">-</span>\n" +
    "                            из\n" +
    "                            <span class=\"cart_shop__count-found__number_of\"><%= filters.length %></span>\n" +
    "                        </span>\n" +
    "                        <span class=\"cart_shop__copy material-icons-outlined ms-2\" data-shop=\"<%= shop.name %>\">content_copy</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"text-nowrap d-flex justify-content-between align-items-end gap-1\">\n" +
    "                    <span class=\"cart_shop__price\"></span>\n" +
    "                    <small class=\"cart_shop__price_currency text-muted\"></small>\n" +
    "                    <span class=\"material-icons material-symbols-outlined\">expand_more</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <ul class=\"list-group rounded-0 list-group-light list-group-small cart_shop__products\" style=\"display: none\">\n" +
    "                <% $.each(filters, function(key, filter) { %>\n" +
    "                <li class=\"list-group-item cart_shop__product filter-key-<%= filter.key %>\n" +
    "                           d-flex justify-content-between align-items-stretch p-0 placeholder-glow\" data-filter-key=\"<%= filter.key %>\" data-shop-name=\"<%= shop.name %>\">\n" +
    "                    <div class=\"cart-shop__product__img d-flex justify-content-center align-items-center\">\n" +
    "                        <i class=\"fs-1 fa-solid fa-spinner fa-spin-pulse\"></i>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"cart-shop__product__header p-2\">\n" +
    "                        <div class=\"cart-shop__product__header-title fw-normal lh-sm\">\n" +
    "                            <span class=\"placeholder col-9\"></span>\n" +
    "                        </div>\n" +
    "                        <small class=\"cart-shop__product__header-subtitle text-muted\"><%= filter.labels.join(', ') %></small>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"cart-shop__product__price py-2 pe-2 text-right lh-sm\">\n" +
    "                        <div class=\"cart-shop__product__price-origin\">\n" +
    "                            <span class=\"cart-shop__product__price_amount\">\n" +
    "                                <span class=\"placeholder col-10\"></span>\n" +
    "                            </span>\n" +
    "                            <small class=\"cart-shop__product__price_currency text-muted\"></small>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"cart-shop__product__price-standard text-muted mb-2\" style=\"display: none\">\n" +
    "                            <div class=\"cart-shop__product__price-standard-row-1\">\n" +
    "                                <span class=\"cart-shop__product__price-standard-amount\"></span>\n" +
    "                                <small class=\"cart-shop__product__price-standard-currency\"></small>\n" +
    "                            </div>\n" +
    "                            <div class=\"cart-shop__product__price-standard-row-2 mb-1\">\n" +
    "                                за <b class=\"cart-shop__product__price-standard-unit\"></b>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"cart-shop__product__price-date text-muted\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"cart-shop__product__controls pe-2 pt-2\">\n" +
    "                        <button class=\"cart-shop__product__delete btn btn-sm btn-outline-warning\" data-filter-key=\"<%= filter.key %>\">\n" +
    "                            <span class=\"material-icons material-symbols-outlined\">delete</span>\n" +
    "                        </button>\n" +
    "                        <button class=\"cart-shop__product__catalog btn btn-sm btn-outline-dark mt-2\" data-filter-key=\"<%= filter.key %>\">\n" +
    "                            <span class=\"material-icons material-symbols-outlined\">settings</span>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "                <% }); %>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <% }); %>\n" +
    "    </div>\n" +
    "<% } %>\n" +
    "\n" +
    "<% if (filters.length == 0) { %>\n" +
    "<h4 class=\"px-3 mt-5 text-muted text-center\">Корзина пуста</h4>\n" +
    "<% } %>"; 

window["appTemplates"]["page-menu/cart/modal"] = "<div class=\"mb-4\">\n" +
    "    <b><%= shop.title %></b>\n" +
    "    <%= labels.join(', ') %>\n" +
    "</div>\n" +
    "\n" +
    "<ul class=\"cart-modal__container list-group list-group-light list-group-small\">\n" +
    "    <% $.each(products, function(key, product) { %>\n" +
    "    <li class=\"list-group-item list-group-item-action d-flex justify-content-between align-items-stretch p-0 rounded-0 product-id-<%= product.id %> <% if (product.id === selectProduct.id) { %>active<% } %> \" data-product-id=\"<%= product.id %>\">\n" +
    "        <div class=\"product-img d-flex justify-content-center align-items-center\">\n" +
    "            <i class=\"fs-1 fa-solid fa-spinner fa-spin-pulse\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"product-title p-2\">\n" +
    "            <div class=\"fw-normal lh-sm\"><%= product.title %></div>\n" +
    "        </div>\n" +
    "        <div class=\"product-price pe-1\">\n" +
    "            <% if (product.standard_price > 0) { %>\n" +
    "            <div class=\"product-price-standard\">\n" +
    "                <div class=\"product-price-standard-row-1\">\n" +
    "                    <b><%= product.standard_price %> </b>\n" +
    "                    <small><%= product.currency %> </small>\n" +
    "                </div>\n" +
    "                <div class=\"product-price-standard-row-2 mb-1\">\n" +
    "                    за <b><%= product.standard_unit %></b>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <% } %>\n" +
    "\n" +
    "            <div class=\"product-price-unit\">\n" +
    "                <span><%= product.price %> </span>\n" +
    "                <small class=\"text-muted\"><%= product.currency %></small>\n" +
    "            </div>\n" +
    "            <div class=\"product-price-date text-muted\">\n" +
    "                <small><%= moment(product.date_price).format('DD.MM.YYYY') %> </small>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "    <% }); %>\n" +
    "</ul>"; 

window["appTemplates"]["page-menu/catalog/categories"] = "\n" +
    "<div class=\"list-group list-group-light position-relative\">\n" +
    "  <a href=\"#\" data-mdb-ripple-color=\"green\" class=\"list-group-item list-group-item-action d-flex justify-content-start align-items-center section-item\">\n" +
    "    <span class=\"material-icons material-symbols-outlined\">chevron_left</span>\n" +
    "    <b>\n" +
    "      <%= section.title %>\n" +
    "    </b>\n" +
    "  </a>\n" +
    "\n" +
    "  <% $.each(section.categories, function(key, category) { %>\n" +
    "  <a href=\"#\" data-mdb-ripple-color=\"green\" data-category-id=\"<%= category.id %>\" class=\"list-group-item list-group-item-action d-flex justify-content-between align-items-center category-item\">\n" +
    "    <%= category.title %>\n" +
    "    <span class=\"material-icons material-symbols-outlined\">chevron_right</span>\n" +
    "  </a>\n" +
    "  <% }); %>\n" +
    "</div>\n" +
    ""; 

window["appTemplates"]["page-menu/catalog/category"] = "<div class=\"position-relative category-id-<%= category.id %>\">\n" +
    "    <div class=\"list-group list-group-light mb-3\">\n" +
    "        <a href=\"#\" data-mdb-ripple-color=\"green\" class=\"list-group-item list-group-item-action d-flex justify-content-start align-items-center section-item border-bottom border-2 rounded-0 py-2\">\n" +
    "            <span class=\"material-icons material-symbols-outlined me-2\">chevron_left</span>\n" +
    "            <div>\n" +
    "                <div class=\"fw-bold\"><%= category.sectionTitle %></div>\n" +
    "                <div class=\"text-muted\"><%= category.title %></div>\n" +
    "            </div>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"filters-controls px-3 mb-5\" style=\"display: none\">\n" +
    "        <div class=\"d-flex justify-content-between align-items-center mb-3\">\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-secondary btn-show-filters\">\n" +
    "                <i class=\"fas fa-filter me-2\"></i>\n" +
    "                Фильтры\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-success btn-save-filters\">\n" +
    "                <i class=\"fas fa-save me-2\"></i>\n" +
    "                Сохранить\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        <div class=\"filters-labels\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <nav class=\"sidenav sidenav-primary\" id=\"filters-sidebar\" style=\"display: none\">\n" +
    "        <div class=\"sidenav-lock\"></div>\n" +
    "        <div class=\"sidenav-body\"></div>\n" +
    "    </nav>\n" +
    "\n" +
    "    <div class=\"category-products\"></div>\n" +
    "</div>"; 

window["appTemplates"]["page-menu/catalog/search"] = "<div class=\"position-relative\">\n" +
    "  <% if (searched.length > 0) { %>\n" +
    "    <ul class=\"list-group list-group-light\">\n" +
    "      <% $.each(searched, function(key, item) { %>\n" +
    "        <a href=\"#\" class=\"list-group-item d-flex justify-content-between align-items-center ripple\" data-category-id=\"<%= item.categoryId %>\">\n" +
    "          <div>\n" +
    "            <div class=\"fw-bold\"><%= item.sectionTitle %></div>\n" +
    "            <div class=\"text-muted\"><%= item.categoryTitle %></div>\n" +
    "          </div>\n" +
    "          <span class=\"material-icons material-symbols-outlined\">chevron_right</span>\n" +
    "        </a>\n" +
    "      <% }); %>\n" +
    "    </ul>\n" +
    "  <% } else { %>\n" +
    "    <h4 class=\"text-muted mt-5 px-3\">Разделы не найдены</h4>\n" +
    "  <% } %>\n" +
    "</div>"; 

window["appTemplates"]["page-menu/catalog/sections"] = "<div class=\"position-relative\">\n" +
    "    <div class=\"input-group search-categories p-3\">\n" +
    "        <label class=\"input-group-text border-0 px-0 pe-3\" for=\"search-field\">\n" +
    "          <i class=\"fas fa-search text-muted\"></i>\n" +
    "        </label>\n" +
    "        <input type=\"search\" id=\"search-field\" class=\"form-control form-control-lg rounded\" placeholder=\"Поиск разделов\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"search-container\" style=\"display: none\"></div>\n" +
    "\n" +
    "    <div class=\"list-group list-group-light sections-container\">\n" +
    "      <% $.each(sections, function(key, section) { %>\n" +
    "        <a href=\"#\" data-mdb-ripple-color=\"green\" data-section-id=\"<%= section.id %>\" class=\"list-group-item list-group-item-action d-flex justify-content-between align-items-center\">\n" +
    "          <%= section.title %>\n" +
    "          <span class=\"material-icons material-symbols-outlined\">chevron_right</span>\n" +
    "        </a>\n" +
    "      <% }); %>\n" +
    "    </div>\n" +
    "</div>"; 

window["appTemplates"]["page-menu/catalog/category/filters"] = "<h5 class=\"m-0 px-3 pt-2 pb-2\">Фильтры</h5>\n" +
    "\n" +
    "<form onsubmit=\"appPageMenu.catalog.category.acceptedFilters();return false;\" class=\"filters-form\">\n" +
    "  <ul class=\"list-unstyled p-3\">\n" +
    "    <li>\n" +
    "      <div class=\"filters-title\">\n" +
    "        <label class=\"form-label fw-bolder\" for=\"filter-title\">Название товара</label>\n" +
    "        <div class=\"filter-title mb-1\">\n" +
    "          <input type=\"text\" id=\"filter-title\" class=\"form-control form-control-sm\" name=\"product_title[]\" value=\"<% if (filters.hasOwnProperty('product_title') && filters.product_title[0]) { %><%= filters.product_title[0] %><% } %>\">\n" +
    "        </div>\n" +
    "\n" +
    "        <% if (filters.hasOwnProperty('product_title') && filters.product_title.length > 1) { %>\n" +
    "          <% $.each(filters.product_title, function(key, product_title) { %>\n" +
    "            <% if (key >= 1) { %>\n" +
    "              <div class=\"filter-title mb-1 d-flex flex-nowrap align-items-center gap-1\">\n" +
    "                <input type=\"text\" class=\"form-control form-control-sm\" name=\"product_title[]\" value=\"<%= product_title %>\">\n" +
    "                <i class=\"fa fa-times p-1\" onclick=\"$(this).parent().remove()\"></i>\n" +
    "              </div>\n" +
    "            <% } %>\n" +
    "          <% }); %>\n" +
    "        <% } %>\n" +
    "      </div>\n" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-link text-capitalize btn-add-filter-title\">еще</button>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <div class=\"filters-brand\">\n" +
    "        <label class=\"form-label fw-bolder\" for=\"filter-brand\">Бренд</label>\n" +
    "        <div class=\"filter-brand mb-1\">\n" +
    "          <select id=\"filter-brand\" class=\"form-control form-control-sm\" name=\"brand[]\">\n" +
    "            <option value=\"\">-</option>\n" +
    "            <% $.each(brands, function(key, brand) { %>\n" +
    "              <option value=\"<%= brand %>\" <% if (filters.hasOwnProperty('brand') && filters.brand[0] === brand) { %>selected=\"selected\"<% } %>>\n" +
    "                <%= brand %>\n" +
    "              </option>\n" +
    "            <% }); %>\n" +
    "          </select>\n" +
    "        </div>\n" +
    "\n" +
    "        <% if (filters.hasOwnProperty('brand') && filters.brand.length > 1) { %>\n" +
    "          <% $.each(filters.brand, function(key, filterBrand) { %>\n" +
    "            <% if (key >= 1) { %>\n" +
    "              <div class=\"filter-brand mb-1 d-flex flex-nowrap align-items-center gap-1\">\n" +
    "                <select class=\"form-control form-control-sm\" name=\"brand[]\">\n" +
    "                  <option value=\"\">-</option>\n" +
    "                  <% $.each(brands, function(key, brand) { %>\n" +
    "                    <option value=\"<%= brand %>\" <% if (filterBrand === brand) { %>selected=\"selected\"<% } %>>\n" +
    "                      <%= brand %>\n" +
    "                    </option>\n" +
    "                  <% }); %>\n" +
    "                </select>\n" +
    "                <i class=\"fa fa-times p-1\" onclick=\"$(this).parent().remove()\"></i>\n" +
    "              </div>\n" +
    "            <% } %>\n" +
    "          <% }); %>\n" +
    "        <% } %>\n" +
    "      </div>\n" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-link text-capitalize btn-add-filter-brand\">еще</button>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <div class=\"filters-country\">\n" +
    "        <label class=\"form-label fw-bolder\" for=\"filter-country\">Страна производитель</label>\n" +
    "        <div class=\"filter-country mb-1\">\n" +
    "          <select id=\"filter-country\" class=\"form-control form-control-sm\" name=\"country[]\">\n" +
    "            <option value=\"\">-</option>\n" +
    "            <% $.each(countries, function(key, country) { %>\n" +
    "              <option value=\"<%= country %>\" <% if (filters.hasOwnProperty('country') && filters.country[0] === country) { %>selected=\"selected\"<% } %>>\n" +
    "                <%= country %>\n" +
    "              </option>\n" +
    "            <% }); %>\n" +
    "          </select>\n" +
    "        </div>\n" +
    "\n" +
    "        <% if (filters.hasOwnProperty('country') && filters.country.length > 1) { %>\n" +
    "          <% $.each(filters.country, function(key, filterCountry) { %>\n" +
    "            <% if (key >= 1) { %>\n" +
    "              <div class=\"filter-country mb-1 d-flex flex-nowrap align-items-center gap-1\">\n" +
    "                <select class=\"form-control form-control-sm\" name=\"country[]\">\n" +
    "                  <option value=\"\">-</option>\n" +
    "                    <% $.each(countries, function(key, country) { %>\n" +
    "                      <option value=\"<%= country %>\" <% if (filterCountry === country) { %>selected=\"selected\"<% } %>>\n" +
    "                        <%= country %>\n" +
    "                      </option>\n" +
    "                    <% }); %>\n" +
    "                </select>\n" +
    "                <i class=\"fa fa-times p-1\" onclick=\"$(this).parent().remove()\"></i>\n" +
    "              </div>\n" +
    "            <% } %>\n" +
    "          <% }); %>\n" +
    "        <% } %>\n" +
    "      </div>\n" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-link text-capitalize btn-add-filter-country\">еще</button>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <label class=\"form-label fw-bolder\">Литры / кг / шт</label>\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-6\">\n" +
    "          <div class=\"form-outline\">\n" +
    "            <input type=\"number\" min=\"0\" id=\"filter-quantity-start\" class=\"form-control form-control-sm\" name=\"quantity_start\" value=\"<% if (filters.hasOwnProperty('quantity_start') && filters.quantity_start) { %><%= filters.quantity_start %><% } %>\">\n" +
    "            <label class=\"form-label\" for=\"filter-quantity-start\">от</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-6\">\n" +
    "          <div class=\"form-outline\">\n" +
    "            <input type=\"number\" min=\"0\" id=\"filter-quantity-end\" class=\"form-control form-control-sm\" name=\"quantity_end\" value=\"<% if (filters.hasOwnProperty('quantity_end') && filters.quantity_end) { %><%= filters.quantity_end %><% } %>\">\n" +
    "            <label class=\"form-label\" for=\"filter-quantity-end\">до</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <label class=\"form-label fw-bolder\">Цена <small>BYN</small></label>\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-6\">\n" +
    "          <div class=\"form-outline col-sm-6\">\n" +
    "            <input type=\"number\" min=\"0\" id=\"filter-price-start\" class=\"form-control form-control-sm\" name=\"price_start\" value=\"<% if (filters.hasOwnProperty('price_start') && filters.price_start) { %><%= filters.price_start %><% } %>\">\n" +
    "            <label class=\"form-label\" for=\"filter-price-start\">от</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-6\">\n" +
    "          <div class=\"form-outline col-sm-6\">\n" +
    "            <input type=\"number\" min=\"0\" id=\"filter-price-end\" class=\"form-control form-control-sm\" name=\"price_end\" value=\"<% if (filters.hasOwnProperty('price_end') && filters.price_end) { %><%= filters.price_end %><% } %>\">\n" +
    "            <label class=\"form-label\" for=\"filter-price-end\">до</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </li>\n" +
    "    <li class=\"mb-4\">\n" +
    "      <label class=\"form-label fw-bolder\">Процентность (при наличии)</label>\n" +
    "\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-6\">\n" +
    "          <div class=\"form-outline col-sm-6\">\n" +
    "            <input type=\"number\" min=\"0\" id=\"filter-percent-start\" class=\"form-control form-control-sm\" name=\"percent_start\" value=\"<% if (filters.hasOwnProperty('percent_start') && filters.percent_start) { %><%= filters.percent_start %><% } %>\">\n" +
    "            <label class=\"form-label\" for=\"filter-percent-start\">от</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-6\">\n" +
    "          <div class=\"form-outline col-sm-6\">\n" +
    "            <input type=\"number\" min=\"0\" id=\"filter-percent-end\" class=\"form-control form-control-sm\" name=\"percent_end\" value=\"<% if (filters.hasOwnProperty('percent_end') && filters.percent_end) { %><%= filters.percent_end %><% } %>\">\n" +
    "            <label class=\"form-label\" for=\"filter-percent-end\">до</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <button type=\"submit\" class=\"btn btn-sm btn-primary btn-filter-accepted\">Применить</button>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</form>"; 

window["appTemplates"]["page-menu/catalog/category/labels"] = "<% if (filters.hasOwnProperty('product_title') && filters.product_title.length > 0) { %>\n" +
    "  <% $.each(filters.product_title, function(key, label) { %>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-tag btn-rounded d-flex align-items-center\" data-filter=\"product_title\" data-filter-key=\"<%= key %>\">\n" +
    "        <span><%= label %></span>\n" +
    "        <span class=\"material-icons material-symbols-outlined fs-6 ms-2\">close</span>\n" +
    "    </button>\n" +
    "  <% }); %>\n" +
    "<% } %>\n" +
    "\n" +
    "<% if (filters.hasOwnProperty('brand') && filters.brand.length > 0) { %>\n" +
    "  <% $.each(filters.brand, function(key, label) { %>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-tag btn-rounded d-flex align-items-center\" data-filter=\"brand\" data-filter-key=\"<%= key %>\">\n" +
    "        <span><%= label %></span>\n" +
    "        <span class=\"material-icons material-symbols-outlined fs-6 ms-2\">close</span>\n" +
    "    </button>\n" +
    "  <% }); %>\n" +
    "<% } %>\n" +
    "\n" +
    "<% if (filters.hasOwnProperty('country') && filters.country.length > 0) { %>\n" +
    "    <% $.each(filters.country, function(key, label) { %>\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-tag btn-rounded d-flex align-items-center\" data-filter=\"country\" data-filter-key=\"<%= key %>\">\n" +
    "            <span><%= label %></span>\n" +
    "            <span class=\"material-icons material-symbols-outlined fs-6 ms-2\">close</span>\n" +
    "        </button>\n" +
    "  <% }); %>\n" +
    "<% } %>\n" +
    "\n" +
    "<% if (filters.hasOwnProperty('quantity_start') && filters.quantity_start > 0) { %>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-tag btn-rounded d-flex align-items-center\" data-filter=\"quantity_start\">\n" +
    "        <span>от <%= filters.quantity_start %></span>\n" +
    "        <span class=\"material-icons material-symbols-outlined fs-6 ms-2\">close</span>\n" +
    "    </button>\n" +
    "<% } %>\n" +
    "\n" +
    "<% if (filters.hasOwnProperty('quantity_end') && filters.quantity_end > 0) { %>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-tag btn-rounded d-flex align-items-center\" data-filter=\"quantity_end\">\n" +
    "        <span>до <%= filters.quantity_end %></span>\n" +
    "        <span class=\"material-icons material-symbols-outlined fs-6 ms-2\">close</span>\n" +
    "    </button>\n" +
    "<% } %>\n" +
    "\n" +
    "<% if (filters.hasOwnProperty('price_start') && filters.price_start > 0) { %>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-tag btn-rounded d-flex align-items-center\" data-filter=\"price_start\">\n" +
    "        <span>от <%= filters.price_start %></span>\n" +
    "        <small class=\"text-muted ms-1\">BYN</small>\n" +
    "        <span class=\"material-icons material-symbols-outlined fs-6 ms-2\">close</span>\n" +
    "    </button>\n" +
    "<% } %>\n" +
    "\n" +
    "<% if (filters.hasOwnProperty('price_end') && filters.price_end > 0) { %>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-tag btn-rounded d-flex align-items-center\" data-filter=\"price_end\">\n" +
    "      <span>до <%= filters.price_end %></span>\n" +
    "      <small class=\"text-muted ms-1\">BYN</small>\n" +
    "      <span class=\"material-icons material-symbols-outlined fs-6 ms-2\">close</span>\n" +
    "    </button>\n" +
    "<% } %>\n" +
    "\n" +
    "<% if (filters.hasOwnProperty('percent_start') && filters.percent_start > 0) { %>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-tag btn-rounded d-flex align-items-center\" data-filter=\"percent_start\">\n" +
    "        <span>от <%= filters.percent_start %></span>\n" +
    "        <small class=\"text-muted\">%</small>\n" +
    "        <span class=\"material-icons material-symbols-outlined fs-6 ms-2\">close</span>\n" +
    "    </button>\n" +
    "<% } %>\n" +
    "\n" +
    "<% if (filters.hasOwnProperty('percent_end') && filters.percent_end > 0) { %>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-tag btn-rounded d-flex align-items-center\" data-filter=\"percent_end\">\n" +
    "        <span>до <%= filters.percent_end %></span>\n" +
    "        <small class=\"text-muted\">%</small>\n" +
    "        <span class=\"material-icons material-symbols-outlined fs-6 ms-2\">close</span>\n" +
    "    </button>\n" +
    "<% } %>"; 

window["appTemplates"]["page-menu/catalog/category/products"] = "<% if (productsTop.length > 0) { %>\n" +
    "<div class=\"products-top-container\">\n" +
    "    <h4 class=\"px-3 pb-2 m-0 border-bottom border-1\">Самые выгодные предложения</h4>\n" +
    "\n" +
    "    <ul class=\"list-group list-group-light mb-4\">\n" +
    "        <% $.each(productsTop, function(key, product) { %>\n" +
    "        <li class=\"list-group-item list-group-item-action d-flex justify-content-between align-items-stretch p-0 product-item\" data-product-id=\"<%= product.id %>\">\n" +
    "            <div class=\"product-img d-flex justify-content-center align-items-center\">\n" +
    "                <i class=\"fs-1 fa-solid fa-spinner fa-spin-pulse\"></i>\n" +
    "            </div>\n" +
    "            <div class=\"product-title p-2\">\n" +
    "                <div class=\"fw-normal lh-sm\"><%= product.title %></div>\n" +
    "                <small class=\"fs-10 shop-title shop-<%= product.shop_name %>\"><%= product.shop_title %></small>\n" +
    "            </div>\n" +
    "            <div class=\"product-price pe-2\">\n" +
    "                <% if (product.standard_price > 0) { %>\n" +
    "                <div class=\"product-price-standard\">\n" +
    "                    <div class=\"product-price-standard-row-1\">\n" +
    "                        <b><%= product.standard_price %> </b>\n" +
    "                        <small><%= product.currency %> </small>\n" +
    "                    </div>\n" +
    "                    <div class=\"product-price-standard-row-2 mb-1\">\n" +
    "                        за <b><%= product.standard_unit %></b>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <% } %>\n" +
    "\n" +
    "                <div class=\"product-price-unit\">\n" +
    "                    <span><%= product.price %> </span>\n" +
    "                    <small class=\"text-muted\"><%= product.currency %></small>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"product-price-date text-muted\">\n" +
    "                    <small><%= moment(product.date_price).format('DD.MM.YYYY') %> </small>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "        <% }); %>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "<% } %>\n" +
    "\n" +
    "<% if (products.length > 0) { %>\n" +
    "<div class=\"products-other-container\">\n" +
    "    <h4 class=\"px-3 pb-2 m-0 border-bottom border-1\">Найденные товары: <%= productsTotal %></h4>\n" +
    "\n" +
    "    <% $.each(products, function(key, product) { %>\n" +
    "    <li class=\"list-group-item list-group-item-action d-flex justify-content-between align-items-stretch p-0 product-item\" data-product-id=\"<%= product.id %>\">\n" +
    "        <div class=\"product-img d-flex justify-content-center align-items-center\">\n" +
    "            <i class=\"fs-1 fa-solid fa-spinner fa-spin-pulse\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"product-title p-2\">\n" +
    "            <div class=\"fw-normal lh-sm\"><%= product.title %></div>\n" +
    "            <small class=\"fs-10 shop-title shop-<%= product.shop_name %>\"><%= product.shop_title %></small>\n" +
    "        </div>\n" +
    "        <div class=\"product-price pe-2\">\n" +
    "            <% if (product.standard_price > 0) { %>\n" +
    "            <div class=\"product-price-standard\">\n" +
    "                <div class=\"product-price-standard-row-1\">\n" +
    "                    <b><%= product.standard_price %> </b>\n" +
    "                    <small><%= product.currency %> </small>\n" +
    "                </div>\n" +
    "                <div class=\"product-price-standard-row-2 mb-1\">\n" +
    "                    за <b><%= product.standard_unit %></b>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <% } %>\n" +
    "\n" +
    "            <div class=\"product-price-unit\">\n" +
    "                <span><%= product.price %> </span>\n" +
    "                <small class=\"text-muted\"><%= product.currency %></small>\n" +
    "            </div>\n" +
    "            <div class=\"product-price-date text-muted\">\n" +
    "                <small><%= moment(product.date_price).format('DD.MM.YYYY') %> </small>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "    <% }); %>\n" +
    "</div>\n" +
    "<% } %>\n" +
    "\n" +
    "<% if (productsTop.length == 0 && products.length == 0) { %>\n" +
    "<h4 class=\"px-3 text-muted text-center\">Товары не найдены</h4>\n" +
    "<% } %>"; 

window["appTemplates"]["page-menu/catalog/category/filters/brand"] = "<div class=\"filter-title mb-1 d-flex flex-nowrap align-items-center gap-1\">\n" +
    "  <select class=\"form-control form-control-sm\" name=\"brand[]\">\n" +
    "    <option value=\"\">-</option>\n" +
    "    <% $.each(brands, function(key, brand) { %>\n" +
    "    <option value=\"<%= brand %>\"><%= brand %></option>\n" +
    "    <% }); %>\n" +
    "  </select>\n" +
    "  <i class=\"fa fa-times p-1\" onclick=\"$(this).parent().remove()\"></i>\n" +
    "</div>"; 

window["appTemplates"]["page-menu/catalog/category/filters/country"] = "<div class=\"filter-title mb-1 d-flex flex-nowrap align-items-center gap-1\">\n" +
    "  <select class=\"form-control form-control-sm\" name=\"country[]\">\n" +
    "    <option value=\"\">-</option>\n" +
    "    <% $.each(countries, function(key, country) { %>\n" +
    "    <option value=\"<%= country %>\"><%= country %></option>\n" +
    "    <% }); %>\n" +
    "  </select>\n" +
    "  <i class=\"fa fa-times p-1\" onclick=\"$(this).parent().remove()\"></i>\n" +
    "</div>"; 

window["appTemplates"]["page-menu/catalog/category/filters/product_title"] = "<div class=\"filter-title mb-1 d-flex flex-nowrap align-items-center gap-1\">\n" +
    "  <input type=\"text\" class=\"form-control form-control-sm\" name=\"product_title[]\">\n" +
    "  <i class=\"fa fa-times p-1\" onclick=\"$(this).parent().remove()\"></i>\n" +
    "</div>"; 
// END 