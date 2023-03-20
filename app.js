// Vue.component('click-counter', {
//   template: '<button @click="count++">{{count}}</button>',
//   data () {
//     return {
//       count: 0
//     }
//   }
// })

// SHIRTS COMPONENT
Vue.component('shirts', {
  template: `<div class="pt-2 pb-5">
  <section class="container mt-5 mx-auto">
    <div class="row mx-auto">
      <div class="col-md-4 mx-auto product-img-container">
        <img v-bind:src="image" v-bind:alt="altText" class="img-fluid product-img"/>
      </div>
  
      <div class="col-md-4 mx-auto product-info">
        <h2>{{title}}</h2>
        <p v-if="inStock" class="pb-0 mb-1">In Stock</p>
          <p v-else class="pb-0 mb-1"><span style="color:red">Cannot Add Item</span></p>
          <p>Qty. Available: {{shirts[selectedVariant].variantQty}}</p>
        <p class="mb-1 pb-1 fs-5" style="color:steelblue"><b>$ {{ shirts[selectedVariant].price }}</b></p>
  
        <div class="row mt-3 mb-3 mx-auto text-center">
          <div v-for="(shirt, index) in shirts" 
            :key="shirt.variantId"
            class="col-4 img-thumbnail"
            :style="{ backgroundImage: 'url(img/' + shirt.variantThumbnail + ')' }"
            @click="updateProduct(index)"> <!-- @ is shorthand for v-on -->
          </div>
        </div>
  
        <div class="my-4">
        <button v-on:click="addToCart"
              class="btn btn-primary" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock}"
              >
            Add to cart
            </button>

            <button v-on:click="removeFromCart"
              class="btn btn-danger"
              :disabled="!inStock && !qtyReached"
              :class="{ disabledButton: !inStock && !qtyReached}"
              >
            Remove from cart
            </button>
      </div>
      </div>
  
      <div class="col-md-4 mx-auto">
        <h3>Item Description</h3>
        <p class="mb-0 fs-5 fw-bold">Details:</p>
        <ul class="mb-3">
          <li v-for="detail in details">{{ detail }} </li>
        </ul>
        <p>{{description}}</p>
      </div>
    </div>
  </section>
</div>`,
data(){
  return {
    brand: 'Koda',
    product: 'Shirts',
    selectedVariant: 0,
    altText: 'Picture of a Koda brand shirt',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    shirts: [
      {
        variantId: 111,
        name: 'Koda Shirt (Apple)',
        variantStyle:'apple',
        variantQty: 4,
        price: 12.99,
        inStock: true,
        variantImage: 'img/img-shirt-apple.jpg',
        variantThumbnail: 'img-thumbnail-apple.jpg',
        qtyInCart: 0,
        qtyMax: 4
      },
      {
        variantId: 112,
        name: 'Koda Shirt (Stars)',
        variantStyle:'stars',
        variantQty: 50,
        price: 10.99,
        inStock: true,
        variantImage: 'img/img-shirt-stars.jpg',
        variantThumbnail: 'img-thumbnail-stars.jpg',
        qtyInCart: 0,
        qtyMax: 50
      },
      {
        variantId: 113,
        name: 'Koda Shirt (Peach)',
        variantStyle:'peach',
        variantQty: 0,
        price: 8.99,
        inStock: false,
        variantImage: 'img/img-shirt-peach.jpg',
        variantThumbnail: 'img-thumbnail-peach.jpg',
        qtyInCart: 0,
        qtyMax: 0
      },
    ]
  }
},
methods: {
  addToCart: function () {
    if(this.shirts[this.selectedVariant].variantQty > 0) {
      this.$emit('add-to-cart', this.shirts[this.selectedVariant].variantId)
      this.shirts[this.selectedVariant].variantQty -= 1;
      console.log("Added to cart. Qty Left: " + this.shirts[this.selectedVariant].variantQty)
    }
  },
  removeFromCart: function() {
    if(this.shirts[this.selectedVariant].variantQty < this.shirts[this.selectedVariant].qtyMax) {
      this.$emit('remove-from-cart', this.shirts[this.selectedVariant].variantId)
      this.shirts[this.selectedVariant].variantQty += 1;
      console.log("Removed from cart. Qty Left: " + this.shirts[this.selectedVariant].variantQty)
    }
  },
  updateProduct: function (index) {
    this.selectedVariant = index
    console.log("Item index: " + index)
  }
},
computed: {
  title() {
    return this.brand + ' ' + this.product;
  },
  image() {
    return this.shirts[this.selectedVariant].variantImage;
  },
  inStock() {
    return this.shirts[this.selectedVariant].variantQty;
  },
  qtyReached() {
    return this.shirts[this.selectedVariant].qtyMax;
  },
  price() {
    return this.shirts[this.selectedVariant].price;
  },
  // qtyLeft() {
  //   return this.shirts[this.selectedVariant].variantQty - 1;
  // }
}
})

// SOCKS COMPONENT
Vue.component('socks', {
  template: `
  <section class="container mt-5 mx-auto">
  <div class="row mx-auto">
    <div class="col-md-4 mx-auto product-img-container">
      <img v-bind:src="image" v-bind:alt="altText" class="img-fluid product-img"/>
    </div>

    <div class="col-md-4 mx-auto product-info">
      <h2 class="mt-3">{{title}}</h2>
      <p v-if="inStock" class="pb-0 mb-1">In Stock</p>
        <p v-else class="pb-0 mb-1"><span style="color:red">Cannot Add Item</span></p>
      <p>Qty. Available: {{socks[selectedVariant].variantQty}}</p>
      <p class="mb-1 pb-1 fs-5" style="color:steelblue"><b>$ {{ socks[selectedVariant].price }}</b></p>

      <div class="row mt-3 mb-3 mx-auto text-center">
        <div v-for="(sock, index) in socks" 
          :key="sock.variantId"
          class="col-4 img-thumbnail"
          :style="{ backgroundImage: 'url(img/' + sock.variantThumbnail + ')' }"
          @click="updateProduct(index)"> <!-- @ is shorthand for v-on -->
        </div>
      </div>

      <div class="my-4">
        <button v-on:click="addToCart"
              class="btn btn-primary" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              >
            Add to cart
            </button>

            <button v-on:click="removeFromCart"
              class="btn btn-danger"
              :disabled="!inStock && !qtyReached"
              :class="{ disabledButton: !inStock && !qtyReached}"
              >
            Remove from cart
            </button>
      </div>
    </div>

    <div class="col-md-4 mx-auto">
      <h3>Item Description</h3>
      <p class="mb-0 fs-5 fw-bold">Details:</p>
      <ul class="mb-3">
        <li v-for="detail in details">{{ detail }} </li>
      </ul>
      <p>{{description}}</p>
    </div>
  </div>
</section>
  `,
  data(){
    return {
      brand: 'Allie',
      product: 'Socks',
      selectedVariant: 0,
      altText: 'Picture of a pair of Allie Socks',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      socks: [
        {
        variantId: 311,
        name: 'Allie Sock (Stars)',
        variantStyle:'stars',
        variantQty: 5,
        price: 3.99,
        inStock: true,
        variantImage: 'img/img-socks-stars.jpg',
        variantThumbnail: 'img-thumbnail-stars.jpg',
        qtyInCart: 0,
        qtyMax: 5
        },
        {
          variantId: 312,
          name: 'Allie Sock (Peach)',
          variantStyle:'peach',
          variantQty: 25,
          price: 5.99,
          inStock: true,
          variantImage: 'img/img-socks-peach.jpg',
          variantThumbnail: 'img-thumbnail-peach.jpg',
          qtyInCart: 0,
          qtyMax: 25
        },
        {
          variantId: 313,
          name: 'Allie Sock (Apple)',
          variantStyle:'apple',
          variantQty: 0,
          price: 6.99,
          inStock: false,
          variantImage: 'img/img-socks-apple.jpg',
          variantThumbnail: 'img-thumbnail-apple.jpg',
          qtyInCart: 0,
          qtyMax: 0
        },
      ]
    }
  },
  methods: {
    addToCart: function () {
      if(this.socks[this.selectedVariant].variantQty > 0) {
        this.$emit('add-to-cart', this.socks[this.selectedVariant].variantId)
        this.socks[this.selectedVariant].variantQty -= 1;
        console.log("Added to cart. Qty Left: " + this.socks[this.selectedVariant].variantQty)
      }
      // this.$emit('add-to-cart', this.socks[this.selectedVariant].variantId)
    },
    removeFromCart: function() {
      if(this.socks[this.selectedVariant].variantQty < this.socks[this.selectedVariant].qtyMax) {
        this.$emit('remove-from-cart', this.socks[this.selectedVariant].variantId)
        this.socks[this.selectedVariant].variantQty += 1;
        console.log("Removed from cart. Qty Left: " + this.socks[this.selectedVariant].variantQty)
      }
      // this.$emit('remove-from-cart', this.socks[this.selectedVariant].variantId)
    },
    updateProduct: function (index) {
      this.selectedVariant = index
      console.log(index)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.socks[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.socks[this.selectedVariant].variantQty;
    },
    qtyReached() {
      return this.socks[this.selectedVariant].qtyMax;
    },
    price() {
      return this.socks[this.selectedVariant].price;
    }
  }
})



// HATS COMPONENT
Vue.component('hats', {
  template: `
  <section class="container mt-5 mx-auto">
  <div class="row mx-auto">
    <div class="col-md-4 mx-auto product-img-container">
      <img v-bind:src="image" v-bind:alt="altText" class="img-fluid product-img"/>
    </div>

    <div class="col-md-4 mx-auto product-info">
      <h2 class="my-4">{{title}}</h2>
      <p v-if="inStock" class="pb-0 mb-1">In Stock</p>
        <p v-else class="pb-0 mb-1"><span style="color:red">Cannot Add Item</span></p>
      <p>Qty. Available: {{hats[selectedVariant].variantQty}}</p>
      <p class="mb-1 pb-1 fs-5" style="color:steelblue"><b>$ {{ price }}</b></p>

      <div class="row mt-3 mb-3 mx-auto text-center">
        <div v-for="(hat, index) in hats" 
          :key="hat.variantId"
          class="col-4 img-thumbnail"
          :style="{ backgroundImage: 'url(img/' + hat.variantThumbnail + ')' }"
          @click="updateProduct(index)"> <!-- @ is shorthand for v-on -->
        </div>
      </div>
      <div class="my-4">
        <button v-on:click="addToCart"
              class="btn btn-primary" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              >
            Add to cart
            </button>

            <button v-on:click="removeFromCart"
              class="btn btn-danger"
              :disabled="!inStock && !qtyReached"
              :class="{ disabledButton: !inStock && !qtyReached}"
              >
            Remove from cart
            </button>
      </div>
    </div>

    <div class="col-md-4 mx-auto">
      <h3>Item Description</h3>
      <p class="mb-0 fs-5 fw-bold">Details:</p>
      <ul class="mb-3">
        <li v-for="detail in details">{{ detail }} </li>
      </ul>
      <p>{{description}}</p>
    </div>
  </div>
</section>
  `,
  data(){
    return {
      brand: 'Bryn',
      product: 'Hats',
      selectedVariant: 0,
      altText: 'Photo of a Bryn Hat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      hats: [
        {
          variantId: 211,
          name: 'Bryn Hat (Peach)',
          variantStyle:'peach',
          variantQty: 25,
          price: 5.99,
          inStock: true,
          variantImage: 'img/img-hats-peach.jpg',
          variantThumbnail: 'img-thumbnail-peach.jpg',
          qtyInCart: 0,
          qtyMax: 25
        },
        {
          variantId: 213,
          name: 'Bryn Hat (Apple)',
          variantStyle:'apple',
          variantQty: 0,
          price: 6.99,
          inStock: false,
          variantImage: 'img/img-hats-apple.jpg',
          variantThumbnail: 'img-thumbnail-apple.jpg',
          qtyInCart: 0,
          qtyMax: 0
        },
        {
        variantId: 212,
        name: 'Bryn Hat (Stars)',
        variantStyle:'stars',
        variantQty: 5,
        price: 3.99,
        inStock: true,
        variantImage: 'img/img-hats-stars.jpg',
        variantThumbnail: 'img-thumbnail-stars.jpg',
        qtyInCart: 0,
        qtyMax: 5
        },
      ]
    }
  },
  methods: {
    addToCart: function () {
      if(this.hats[this.selectedVariant].variantQty > 0) {
        this.$emit('add-to-cart', this.hats[this.selectedVariant].variantId)
        this.hats[this.selectedVariant].variantQty -= 1;
        console.log("Added to cart. Qty Left: " + this.hats[this.selectedVariant].variantQty)
      }
      // this.$emit('add-to-cart', this.hats[this.selectedVariant].variantId)
    },
    removeFromCart: function() {
      if(this.hats[this.selectedVariant].variantQty < this.hats[this.selectedVariant].qtyMax) {
        this.$emit('remove-from-cart', this.hats[this.selectedVariant].variantId)
        this.hats[this.selectedVariant].variantQty += 1;
        console.log("Removed from cart. Qty Left: " + this.hats[this.selectedVariant].variantQty)
      }
      // this.$emit('remove-from-cart', this.hats[this.selectedVariant].variantId)
    },
    updateProduct: function (index) {
      this.selectedVariant = index
      console.log(index)
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.hats[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.hats[this.selectedVariant].variantQty;
    },
    qtyReached() {
      return this.hats[this.selectedVariant].qtyMax;
    },
    price() {
      return this.hats[this.selectedVariant].price;
    },
    // totalCalc() {
    //   let totals = 0
    //   totals = this.hats[0].qtyInCart + this.hats[1].qtyInCart + this.hats[2].qtyInCart
    //   return totals 
    // }
  }
})

//PRODUCT REVIEW COMPONENT
Vue.component('product-review', {
  template: `
  <form class="mb-5" @submit.prevent="onSubmit" width="90%">
    <div v-if="errors.length" class="alert alert-danger alert-dismissible fade show" role="alert">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div v-else></div>
    <p v-else></p>
    <div class="mb-3">
      <label for="name" class="form-label">Name:</label>
      <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter your name...">
    </div>
    <div class="mb-3">
      <input type="date" class="form-control" id="date" v-model="date" style="width:12rem">
    </div>
    <div class="mb-3">
      <label for="review" class="form-label">Review:</label><br>
      <textarea id="review" class="form-control" v-model="review"></textarea>
    </div>
    <div>
      <label for="rating" class="form-label">Rating (out of 5):</label><br>
      <select id="rating" class="form-select" v-model.number="rating" style="width:12rem">
        <option value="1">&#9733;</option>
        <option value="2">&#9733;&#9733;</option>
        <option value="3">&#9733;&#9733;&#9733;</option>
        <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
        <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
      </select>
    </div>
    <button type="Submit" class="btn btn-dark mt-3" value="Submit">Submit</button>
  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      date: null,
      errors: [], //for custom form validation
    }
  },
  methods: {
    onSubmit() {
      if(this.name && this.review && this.rating &&this.date){
        //checks if all sections of form are submitted
        //before pushing the data to review-submitted
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          date: this.date
        }
        this.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.date = null
      }
      else {
        //if a part (or all) of the form is missing data
        //show an error message
        if(!this.name) this.errors.push("Name required!")
        if(!this.review) this.errors.push("Review required!")
        if(!this.rating) this.errors.push("Rating required!")
        if(!this.date) this.errors.push("Select a date!")
      }
      
    }
  }
})


//APP INSTANCE
new Vue({
  el: '#app',
  data: {
    cart: [],
    reviews: [],
    orderNum: Math.floor(Math.random()*1000),
    shirts: [
      {
        variantId: 111,
        name: 'Koda Shirts',
        variantStyle:'apple',
        variantQty: 4,
        price: 12.99,
        variantImage: 'img/img-shirt-apple.jpg',
        variantThumbnail: 'img-thumbnail-apple.jpg',
        details: ["80% cotton", "20% polyester", "Gender-neutral"]
      }
    ],
    hats: [
      {
        variantId: 213,
        name: 'Bryn Hats',
        variantStyle:'peach',
        variantQty: 3,
        price: 12.99,
        variantImage: 'img/img-hats-peach.jpg',
        variantThumbnail: 'img-thumbnail-peach.jpg',
        details: ["80% cotton", "20% polyester", "Gender-neutral"]
      }
    ],
    socks: [
      {
        variantId: 312,
        name: 'Allie Socks',
        variantStyle:'stars',
        variantQty: 0,
        price: 5.99,
        variantImage: 'img/img-socks-stars.jpg',
        variantThumbnail: 'img-thumbnail-stars.jpg',
        details: ["80% cotton", "20% polyester", "Gender-neutral"]
      }
    ]
  },
  methods: {
    updateCart(id) {
        this.cart.push(id)
    },
    removeItem(id) {
      // let i = this.cart.lastIndexOf(id) + 2
      // this.cart = this.cart.slice(i, 1)
      // console.log(this.cart)
      for(var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
           this.cart.splice(i, 1);
           return
        }
      }
    },
    addReview: function (productReview) {
      this.reviews.push(productReview);
    }
  },
  computed: {
    totalCart: function(){
      let total = 0;
      for (let index = 0; index < this.cart.length; index++) {
          const element = this.cart[index];
          total = total + (element.price);
      }
      return total;
    }
  }
})

