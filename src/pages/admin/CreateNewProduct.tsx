import { FieldValues, SubmitHandler } from "react-hook-form";
import BSForm from "../../components/form/BSForm";
import BSInput from "../../components/form/BSInput";
import { Button } from "antd";
import BSSelect from "../../components/form/BSSelect";
import BSTextArea from "../../components/form/BSTestArea";
import axios from "axios";
import { toast } from "sonner";
import { useAddProductMutation } from "../../redux/features/products/product.api";

const category = ["Mountain", "Road", "Hybrid", "Electric"];

const CreateNewProduct = () => {
  const [addNewProduct] = useAddProductMutation()
  const categoryOptions = category?.map((item) => ({
    value: item,
    label: item,
  }));
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Product is adding...') 
    try {
      const formData = new FormData();
      formData.append("file", data.image[0]);
      formData.append("upload_preset", "myClouds");
      formData.append("cloud_name", "dtp5fwvg9");

      const response = await axios.post(`https://api.cloudinary.com/v1_1/dtp5fwvg9/image/upload`, formData);
      const imageUrl = response.data.secure_url;

      const productData = {
        name: data.name,
        brand: data.brand,
        image: imageUrl,
        price: Number(data.price),
        category: data.category,
        description: data.description,
        quantity: Number(data.quantity),
        inStock: true
      }
      const res = await addNewProduct(productData);
      if(res.data) {

        toast.success('Producted Added Successfully!', {id:toastId, duration: 2000})
      }
      else {
        toast.error('Please Try again...!', {id:toastId, duration: 2000})
      }
      
      
    } catch (err) {
      console.log(err)
      toast.error('Please Try again...!', {id:toastId, duration: 2000})
    }
  };
  
  return (
    <div className="max-w-xl w-full mx-auto flex flex-col justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-600">
          Create New Product
        </h1>

        <BSForm onSubmit={onsubmit}>
          <BSInput
            name="name"
            label="Product Name"
            type="text"
            rules={{
              required: "Product name is required",
            }}
          />
          <BSInput
            name="brand"
            label="Brand"
            type="text"
            rules={{
              required: "Product brand is required",
            }}
          />
          <BSInput
            name="image"
            label="Image"
            type="file"
            accept="image/*"
            rules={{
              required: "Product image is required",
            }}
          />
          
          <BSInput
            name="price"
            label="Price"
            type="number"
            rules={{
              required: "Product price is required",
            }}
          />
          <BSSelect
            label="Category"
            name="category"
            options={categoryOptions}
            rules={{
              required: "Product category is required",
            }}
          />
          <BSInput
            name="quantity"
            label="Quantity"
            type="number"
            rules={{
              required: "Product quantity is required",
            }}
          />
          <BSTextArea
            name="description"
            label="Description"
            rules={{
              required: "Product Description is required",
            }}
          />

          <div className="flex justify-end">
            <Button htmlType="submit" className=" flex bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium shadow-md">
              Submit
            </Button>
          </div>
        </BSForm>
      </div>
    </div>
  );
};

export default CreateNewProduct;
