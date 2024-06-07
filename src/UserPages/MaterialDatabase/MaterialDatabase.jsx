import React, { useState, useEffect, useRef } from "react";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import ShowTable from "./ShowProducts";
import useCategoryData from "../../CommonUtitlites/customHooks/useGetCategory";
import useGetProductDatabase from "../../CommonUtitlites/customHooks/useGetProductsDatabase";
import useSubCategoryData from "../../CommonUtitlites/customHooks/useGetSubCategory";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import SearchInput from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import {
  role,
  userId,
} from "../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import Loader from "../../CommonUtitlites/Loader/Loader";
import AddUom from "./AddUom";
import useGetAllUom from "../../CommonUtitlites/customHooks/useGetAllUom";
import useGetRolePermissionComponentWise from "../../CommonUtitlites/customHooks/useGetPermissionComponentWise";

const UserMaterialDatabase = ({ compPermission }) => {
  let permission = useGetRolePermissionComponentWise(compPermission)
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const permissionObject = permission.map((item) => ({
      [item.permission]: item.value,
    }));
    setPermissions(permissionObject);
  }, [permission]);
  console.log(permissions);

  const [status, setStatus] = useState("");

  const unitOfMeasurement = useGetAllUom(status);

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

  const { products, loading } = useGetProductDatabase(status);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    let productDesc = formData.get("productDesc");
    let uom = formData.get("uom").toLowerCase();

    console.log(categorySearchTermId, subcategorySearchTermId);
    let result = api.post("/create-product", {
      categoryId: categorySearchTermId,
      subCategoryId: subcategorySearchTermId,
      productDesc,
      uom,
    });
    result = await errorHandler(result);
    setStatus(result.data.data._id);
    alert(result.data.message);
  };
  const handleDeleteCategory = async (categoryId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Category?"
    );
    if (!confirmDelete) {
      // If the user cancels the deletion, do nothing
      return;
    }

    let tempdata = {};
    tempdata.categoryId = categoryId;
    tempdata.userId = userId;
    tempdata.role = role;
    let result = await api.post("/delete-category", tempdata);
    result = await errorHandler(result);
    // setStatus(result.data.data._id);
    console.log(result);
    alert(result.data.message);
    // console.log('want to delete this category', categoryId);
    // console.log(" Delete this category", tempdata);
  };

  const handleDeleteSubCategory = async (subcategoryId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this SubCategory?"
    );
    if (!confirmDelete) {
      // If the user cancels the deletion, do nothing
      return;
    }
    let tempdata = {};
    tempdata.subcategoryId = subcategoryId;
    tempdata.categoryId = categorySearchTermId;
    tempdata.userId = userId;
    tempdata.role = role;
    console.log("before api", tempdata);
    let result = await api.post("/delete-subcategory", tempdata);
    result = await errorHandler(result);
    // setStatus(result.data.data._id);
    console.log(result);
    alert(result.data.message);
    // console.log('Tried to delete', tempdata);
  };
  // console.log('checking', categories);

  return (
    <>
      <h6 className="mt-3">Material Database</h6>
      <hr />
      <div className="title">


        {permissions.some((item) => item.add === true) && (
          <button
            className="btn btn-primary btn-sm d-flex mx-auto my-2 mb-4"
            style={{ fontSize: '16px', borderRadius: '8px' }}
            onClick={() => setModalOpen(true)}
          >
            Add Products
          </button>
        )}

        {permissions.some((item) => item.delete === true) && (
          <>
            <button
              className="btn btn-danger btn-sm d-flex mx-auto my-2 mb-4"
              style={{ fontSize: '16px', borderRadius: '8px' }}
              onClick={() => setModalOpen3(true)}
            >
              Delete Category
            </button>
            <button
              className="btn btn-danger btn-sm d-flex mx-auto my-2 mb-4"
              style={{ fontSize: '16px', borderRadius: '8px' }}
              onClick={() => {
                setSubCategories([]); // Set subCategories state to an empty array
                setModalOpen4(true);
              }}
            >
              Delete SubCategory
            </button>
          </>
        )}

      </div>
      <div className="container px-5 mx-4">
        <CustomModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={"Add Products"}
        >
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <SearchInput
                title={"Select Category"}
                items={categories}
                ResultOnClick={(result) => handleCategoryResultClick(result)}
                placeholder={"Search Category"}
              />
              <button
                onClick={() => setModalOpen1(true)}
                className="btn btn-primary btn-sm mt-5 ml-4"
                style={{ borderRadius: "2rem", fontSize: "16px" }}
                type="button"
              >
                Add Category
              </button>
            </div>




            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "28px" }}>
              <SearchInput
                title={"Select Sub Category"}
                items={subCategories}
                ResultOnClick={(result) => setSubcategorySearchTermId(result.id)}
                placeholder={"Search Sub Category"}
                allClear={clear}
              />
              <button
                onClick={() => setModalOpen2(true)}
                className="btn btn-primary btn-sm mt-5 ml-4"
                style={{ borderRadius: "2rem", fontSize: "16px" }}
                type="button"
              >
                Add Sub Category
              </button>
            </div>



            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-group " style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label htmlFor="productDesc">Product Description</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Description"
                  id="productDesc"
                  name="productDesc"
                  style={{ width: "440px", height: "40px" }}
                />
                <label htmlFor="productDesc">Unit Of Measurement</label>
                <select
                  id="uom"
                  name="uom"
                  required
                  placeholder="Enter Unit Of Measurement"
                  className="form-control"
                  autoComplete="off"
                  style={{ width: "440px", height: "40px" }}
                >
                  <option value="">Select Options</option>

                  {unitOfMeasurement &&
                    unitOfMeasurement.map((uom) => (
                      <option value={uom.name}>{uom.name}</option>
                    ))}
                </select>
                <div className="mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button
                    onClick={() => setModalOpen5(true)}
                    className="btn btn-primary btn-sm text-sm"
                    style={{ borderRadius: "2rem", fontSize: "16px", marginRight: "15px" }}
                    type="button"
                  >
                    Add UOM
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary "
                    style={{ borderRadius: "2rem", fontSize: "16px", marginLeft: "12px" }}
                  >
                    Submit
                  </button>
                </div>

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

            <CustomModal
              title={"Add Uom"}
              isOpen={modalOpen5}
              onClose={() => setModalOpen5(false)}
            >
              <AddUom setStatus={(status) => setStatus(status)} />
            </CustomModal>
          </div>
        </CustomModal>

        <CustomModal
          isOpen={modalOpen3}
          onClose={() => setModalOpen3(false)}
          title={"Delete Category"}
        >
          <div className="container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="border">Category Name</th>
                  <th className="border">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className="border">{category.name}</td>
                    <td className="border">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CustomModal>


        <CustomModal
          isOpen={modalOpen4}
          onClose={() => setModalOpen4(false)}
          title={"Delete SubCategory"}
        >
          <div className="container">
            <div className="container d-flex flex-column align-items-center mb-4">
              <SearchInput
                title={"Select Category"}
                items={categories}
                ResultOnClick={(result) => handleCategoryResultClick(result)}
                placeholder={"Search Category"}
                style={{ width: '50%' }}
              />


            </div>
            <h3 className="mb-4">Associated Subcategories are: </h3>
            <div className="container">
              <table className="table table-bordered">
                <thead style={{backgroundColor:"#cedfe5"}}>
                  <tr>
                    <th className="border">Subcategory Name</th>
                    <th className="border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategories && subCategories.length > 0 ? (
                    subCategories.map((subcategory) => (
                      <tr key={subcategory._id}>
                        <td className="border">{subcategory.name}</td>
                        <td className="border">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteSubCategory(subcategory._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="border">
                        No SubCategories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CustomModal>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <ShowTable
            data={products ? products : []}
            permission={permissions.some((item) => item.delete === true)}
            setStatus={setStatus}
          />
        </div>
      )}
    </>
  );
};

export default UserMaterialDatabase;
