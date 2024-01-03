var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      let orderDateElement = document.getElementById('order_date');
      orderDateElement.textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      let inventoryItemTemplate = document.getElementById('inventory_item');
      this.template = Handlebars.compile(inventoryItemTemplate.innerHTML);
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function(itemOnPage) {
      var id = this.findID(itemOnPage),
          item = this.get(id);

      item.name = itemOnPage.querySelector("[name^=item_name]").value;
      item.stock_number = itemOnPage.querySelector("[name^=item_stock_number]").value;
      item.quantity = itemOnPage.querySelector("[name^=item_quantity]").value;
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add(),
          itemOnPage = this.template({id: item.id});
      let inventory = document.getElementById("inventory")
      inventory.insertAdjacentHTML('beforeend', itemOnPage);
    },
    findParent: function(e) {
      return e.target.closest("tr");
    },
    findID: function(item) {
      return +item.querySelector("input[type=hidden]").value;
    },
    deleteItem: function(e) {
      e.preventDefault();
      var item = this.findParent(e).cloneNode(true);
      this.findParent(e).remove();

      this.remove(this.findID(item));
    },
    updateItem: function(e) {
      var item = this.findParent(e);

      this.update(item);
    },
    bindEvents: function() {
      document.getElementById("add_item").addEventListener("click", this.newItem.bind(this));
      document.getElementById("inventory").addEventListener("click", event => {
        if (event.target.classList.contains('delete')) {
          this.deleteItem.call(this, event);
        }
      });
      document.getElementById("inventory").addEventListener("blur", event => {
        if (event.target instanceof HTMLInputElement) {
          this.updateItem.call(this, event);
        }
      });
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  inventory.init.call(inventory);
});