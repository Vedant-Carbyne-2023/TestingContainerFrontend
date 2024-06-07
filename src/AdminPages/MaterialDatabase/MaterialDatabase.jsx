import React, { useState, useEffect, useRef } from "react";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import ShowTable from "./ShowProducts";
import useCategoryData from "../../CommonUtitlites/customHooks/useGetCategory";
import useGetProductDatabase from "../../CommonUtitlites/customHooks/useGetProductsDatabase";
import useSubCategoryData from "../../CommonUtitlites/customHooks/useGetSubCategory";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import SearchInput from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import { role, userId, userName} from "../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import Loader from "../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';
import useGetAllUom from "../../CommonUtitlites/customHooks/useGetAllUom";
import AddUom from "./AddUom";

const MaterialDatabase = () => {
  const [status, setStatus] = useState("");


  const categories = useCategoryData(status);
  const [categorySearchTermName, setCategorySearchTermName] = useState("");
  const [categorySearchTermId, setCategorySearchTermId] = useState("");

  const [subCategories, setSubCategories] = useState([]);

  let subCategoriesByhook = useSubCategoryData(
    categorySearchTermId ? categorySearchTermId : "",
    status
  );

  useEffect(() => {
    setSubCategories(subCategoriesByhook);
    // console.log('checking',subCategoriesByhook);
  }, [subCategoriesByhook, status]);

  const { products,loading } = useGetProductDatabase(status);

  const [subcategorySearchTermId, setSubcategorySearchTermId] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen4, setModalOpen4] = useState(false);
  const [modalOpen5, setModalOpen5] = useState(false);

  const [clear, setClear] = useState(false);

  const handleCategoryResultClick = (result) => {
    setClear(!clear);
    setSubCategories([]);
    setCategorySearchTermId(result.id);
    setCategorySearchTermName(result.name);
  };
  const unitOfMeasurement = useGetAllUom(status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target);
    const formData = new FormData(e.target);
    let productDesc = formData.get("productDesc");
    let uom = formData.get("uom").toLowerCase();

    // console.log(categorySearchTermId, subcategorySearchTermId);
    let result = api.post("/create-product", {
      categoryId: categorySearchTermId,
      subCategoryId: subcategorySearchTermId,
      productDesc,
      uom,
      userId,
      role,
      userName,
    });
    result = await errorHandler(result);
    setStatus(result.data.data._id);
    Swal.fire(result.data.message);
    // alert(result.data.message);
  };
  const handleDeleteCategory = async (categoryId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this Category?");
    if (!confirmDelete) {
      // If the user cancels the deletion, do nothing
      return;
    }
  
    let tempdata = {};
    tempdata.categoryId = categoryId;
    tempdata.userId = userId;
    tempdata.role = role;
    tempdata.userName = userName;
    let result = await api.post('/delete-category', tempdata);
    result = await errorHandler(result);
    // setStatus(result.data.data._id);
    // console.log(result);
    Swal.fire(result.data.message);
    // alert(result.data.message);
    // console.log('want to delete this category', categoryId);
    // console.log(" Delete this category", tempdata);
  };
   
  const handleDeleteSubCategory = async (subcategoryId) =>{
    // Ask for confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this SubCategory?");
    if (!confirmDelete) {
      // If the user cancels the deletion, do nothing
      return;
    }
    let tempdata = {};
    tempdata.subcategoryId = subcategoryId;
    tempdata.categoryId = categorySearchTermId;
    tempdata.userId = userId;
    tempdata.role = role;
    tempdata.userName = userName;
    // console.log('before api',tempdata);
    let result = await api.post('/delete-subcategory', tempdata);
    result = await errorHandler(result);
     // setStatus(result.data.data._id);
    // console.log(result);
    Swal.fire(result.data.message);
    // alert(result.data.message);
    // console.log('Tried to delete', tempdata);
  }
  // console.log('checking', categories);

  return (
    <>
      <div className="title">
        <span>Material Database</span>
        <button
          className="btn btn-sm d-flex mx-auto my-2"
          onClick={() => setModalOpen(true)}
        >
          Add Products
        </button>

{
  role === 'SuperUser'

  &&
  <>
        <button
        className="btn btn-sm d-flex mx-auto my-2"
        onClick={() => setModalOpen3(true)}
        >
          Delete Category
        </button>
        <button
          className="btn btn-sm d-flex mx-auto my-2"
          onClick={() => {
            setSubCategories([]); // Set subCategories state to an empty array
            setModalOpen4(true);
          }}
          >
          Delete SubCategory
        </button>
        </>
        }
      </div>
      <div className="container px-5 mx-4">
        <CustomModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={"Add Products"}
        >
          <div className="container">
           
              <SearchInput
                title={"Select Category"}
                items={categories}
                ResultOnClick={(result) => handleCategoryResultClick(result)}
                placeholder={"Search Category"}
              />

              <button
                onClick={() => setModalOpen1(true)}
                className="btn d-flex mx-auto mt-2 btn-primary btn-sm text-sm"
                style={{ borderRadius: "2rem", justifyContent: "right" }}
                type="button"
              >
                Add Category
              </button>

              <SearchInput
                title={"Select Sub Category"}
                items={subCategories}
                ResultOnClick={(result) =>
                  setSubcategorySearchTermId(result.id)
                }
                placeholder={"Search Sub Category"}
                allClear={clear}
              />

              <button
                onClick={() => setModalOpen2(true)}
                className="btn d-flex mx-auto mt-2 btn-primary btn-sm text-sm"
                style={{ borderRadius: "2rem", justifyContent: "right" }}
                type="button"
              >
                Add Sub Category
              </button>
               <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="productDesc">Product Description</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Description"
                  id="productDesc"
                  name="productDesc"
                />
               <label htmlFor="productDesc">Unit Of Measurement</label>
                <select
                  id="uom"
                  name="uom"
                  required
                  placeholder="Enter Unit Of Measurement"
                  className="form-control"
                  autoComplete="off"
                >
                  <option value="">Select Options</option>
                  
                  {unitOfMeasurement &&
                    unitOfMeasurement.map((uom) => (
                      <option value={uom.name}>{uom.name}</option>
                    ))}
                </select>
                <button
                  onClick={() => setModalOpen5(true)}
                  className="btn d-flex mx-auto mt-2 btn-primary btn-sm text-sm"
                  style={{ borderRadius: "2rem", justifyContent: "right" }}
                  type="button"
                >
                  Add UOM
                </button>
              </div>

              <div class="d-grid gap-2">
                <button
                  type="submit"
                  className="btn  btn-primary  mt-4"
                  style={{
                    borderRadius: "2rem",
                    margin: "0 auto",
                    display: "flex",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>


            <CustomModal
              title={"Add Category"}
              isOpen={modalOpen1}
              onClose={() => setModalOpen1(false)}
            >
              <AddCategory setStatus={(status) => setStatus(status)} />
            </CustomModal>
            <CustomModal
              title={"Add Uom"}
              isOpen={modalOpen5}
              onClose={() => setModalOpen5(false)}
            >
              <AddUom setStatus={(status) => setStatus(status)} />
            </CustomModal>

            <CustomModal
              title={"Add Sub Category"}
              isOpen={modalOpen2}
              onClose={() => setModalOpen2(false)}
            >
              <AddSubCategory
                setStatus={(status) => setStatus(status)}
                categoryId={categorySearchTermId}
                categoryName={categorySearchTermName}
                error={(error) => setModalOpen2(error)}
              />
            </CustomModal>


          </div>
        </CustomModal>

        <CustomModal
        isOpen={modalOpen3}
        onClose={() => setModalOpen3(false)}
        title={"Delete Category"}
        >
          <div className="container">
          {categories.map((category) => (
              <div key={category._id} className="d-flex align-items-center mb-2">
              <p className="me-2">{category.name}</p>
              <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteCategory(category._id)}>Delete</button>
              </div>
           ))}
          </div>
        </CustomModal>

        <CustomModal
        isOpen={modalOpen4}
        onClose={() => setModalOpen4(false)}
        title={"Delete SubCategory"}
        >
          <div className="container">
          <SearchInput
                title={"Select Category"}
                items={categories}
                ResultOnClick={(result) => handleCategoryResultClick(result)}
                placeholder={"Search Category"}
              />
          <h3>Associated Subcategories are: </h3>
          {(subCategories&&subCategories.length > 0) ? (
               subCategories.map((subcategory) => (
                 <div key={subcategory._id} className="d-flex align-items-center mb-2">
                    <p className="me-2">{subcategory.name}</p>
                    <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteSubCategory(subcategory._id)}>Delete</button>
                 </div>
               ))
              ) : (
                <p>No SubCategories found.</p>
            )}
          </div>
        </CustomModal>
      </div>
      {loading?<Loader/>:(
      <div>
      <ShowTable data={products ? products : []} setStatus={setStatus} />
      </div>
      )}
    </>
  );
};

export default MaterialDatabase;
