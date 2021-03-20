<template>
	<div class="products">
		<div class="container">
			<div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                    <h3>Products Page</h3>
                    
                 <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="/img/svg/products.svg" alt="" class="img-fluid">
              </div>
            </div>
          </div>
          <h3>product test</h3>
          
          <h3 class="d-inline-block">product list</h3>
          <button class="btn btn-primary float-right" @click="addNew()">add product</button>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>name</th>
                  <th>price</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products">
                        <td>
                          {{product.name}}
                        </td>

                        <td>
                          {{product.price}}
                        </td>

                        <td>
                          <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
                          <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
                        </td>

                      </tr>
              </tbody>
            </table>
          </div>
		</div>
    <!-- Modal -->
<div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="editTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editTitle">Edit product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div id="product-test">
            <div class="form-group">
              <input type="text" placeholder="Product name" v-model="product.name" class="form-control" name="">
            </div>
            <div class="form-group">
              <input type="text" placeholder="Product price" v-model="product.price" class="form-control" name="">
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="updateProduct()">Save Changes</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor v-model="product.description"></vue-editor>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" @keyup.188="addTag()" placeholder="Product tags" v-model="tag" class="form-control">
                      <div  class="d-flex">
                        <p v-for="tag in product.tags">
                            <span class="p-1">{{tag}}</span>
                        </p>

                      </div>
                      
                    </div>


                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1" v-for="(image, index) in product.images">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>

                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </div>
      </div>
	</div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import {fb,db} from '../firebase';
export default {

  name: 'products', 

  data () {
    return {
      products:[],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
     },
     activeItem: null,
     modal: null,
     tag: null
    }
  },
  components: {
    VueEditor
  }
  ,  
  firestore(){
    return {
      products: db.collection('products')
    }
  }
  ,
  methods: {
    deleteImage(img,index){

      let image = fb.storage().refFromURL(img);

      this.product.images.splice(index,1);
      console.log(image)
      console.log(img)
      image.delete().then(function() {
        console.log('image deleted');
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log('an error occurred');
      });

    },addTag(){
       this.product.tags.push(this.tag);
       this.tag = "";
    }
    ,uploadImage(e){

      if(e.target.files[0]){
        
          let file = e.target.files[0];
    
          var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
    
          let uploadTask  = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {
            
          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
              console.log('uploaded at', downloadURL)
            });
          });
      }
    },
  reset(){
      this.product = {
          name:null,
          description:null,
          price:null,
          tags:[],
          images:[]
      }
      this.tag=null
    }
    ,addNew(){
        this.modal = 'new';
        this.reset();
        $('#product').modal('show');
    },
    updateProduct(){
        this.$firestore.products.doc(this.product.id).update(this.product);
          Toast.fire({
            icon: 'success',
            title: 'Updated  successfully'
          })

           $('#product').modal('hide');
    }
    ,editProduct(product) {
      this.modal = 'edit';
      this.product = product;
      $('#product').modal('show');
    }
    ,deleteProduct(doc){
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete() //chen object product va xoa bang id 'doc['.key']
          
          Toast.fire({
            icon: 'success',
            title: 'Deleted successfully'
          })
        }
      })
    }
    ,readData() {
      
    },
    addProduct() {
      this.$firestore.products.add(this.product);
      $('#product').modal('hide');
    }
  }
}
</script>

<style lang="css" scoped>
</style>