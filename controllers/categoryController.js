import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async(req,res) => {
    try{
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({ message: "Name is required" });
        }
        
        // Check if category already exists
        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).send({success:true, message: "Category already exists" });
        }

        // Create new category
        const category = await new CategoryModel({ name, slug:slugify(name) }).save();
        
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            category,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const updateCategoryController = async(req,res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
       
        // Check if category exists
        const category = await CategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        
           

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}

export const categoryController = async(req,res) => {
    try {
        const category = await CategoryModel.find({});
        res.status(200).send({
            success: true,
            message: "Categories fetched successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const singleCategoryController = async(req,res) => {
    try {
        const category = await CategoryModel.findOne({ slug:req.params.slug });
        res.status(200).send({
            success: true,
            message: "Category fetched successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};  

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findByIdAndDelete(id); // ✅ Save deleted doc

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      category, // ✅ Now this is defined
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
