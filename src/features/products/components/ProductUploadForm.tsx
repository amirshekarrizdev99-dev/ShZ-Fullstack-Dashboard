"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateProduct } from "../hooks/useProducts";
import {
  productSchema,
  type ProductFormValues,
} from "../validation/product.schema";
import { uploadProductImage } from "@/lib/supabase/storage";
import { useIsAdmin } from "@/features/auth";

const INITIAL_FORM: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  category: "",
  stock: 0,
  image: "",
};

export default function ProductUploadForm() {
  const { data: isAdmin } = useIsAdmin();

  console.log(isAdmin);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const createProduct = useCreateProduct();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: INITIAL_FORM,
  });

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.from(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    {
      scope: containerRef,
    },
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setImagePreview(null);

      setValue("image", "", {
        shouldValidate: true,
      });

      return;
    }

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);

    setValue("image", file.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: ProductFormValues) => {
    if (!isAdmin) {
      return;
    }
    try {
      let imageUrl = "";

      if (selectedFile) {
        imageUrl = await uploadProductImage(selectedFile);
      }

      await createProduct.mutateAsync({
        name: data.name.trim(),
        description: data.description.trim(),
        price: data.price,
        category: data.category.trim(),
        stock: data.stock,
        image: imageUrl,
        createdat: new Date().toISOString(),
      });

      reset(INITIAL_FORM);
      setImagePreview(null);
      setSelectedFile(null);
    } catch {
      // Error handling is handled by the mutation/query layer.
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-w-0 p-6 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Upload Product
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add a new product to your catalog.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Product Name
          </label>

          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="MacBook Pro 14"
            className={`w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-gray-800 outline-none transition dark:text-white ${
              errors.name
                ? "border-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500 dark:border-gray-700"
            }`}
          />

          {errors.name && (
            <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>

          <textarea
            id="description"
            {...register("description")}
            rows={4}
            placeholder="Enter product description..."
            className={`w-full resize-none rounded-lg border bg-transparent px-4 py-3 text-sm text-gray-800 outline-none transition dark:text-white ${
              errors.description
                ? "border-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500 dark:border-gray-700"
            }`}
          />

          {errors.description && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Price
            </label>

            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              {...register("price", {
                valueAsNumber: true,
              })}
              placeholder="249"
              className={`w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-gray-800 outline-none transition dark:text-white ${
                errors.price
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500 dark:border-gray-700"
              }`}
            />

            {errors.price && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor="stock"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Stock
            </label>

            <input
              id="stock"
              type="number"
              min="0"
              {...register("stock", {
                valueAsNumber: true,
              })}
              placeholder="40"
              className={`w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-gray-800 outline-none transition dark:text-white ${
                errors.stock
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500 dark:border-gray-700"
              }`}
            />

            {errors.stock && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>

          <select
            id="category"
            {...register("category")}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition dark:bg-gray-900 dark:text-white ${
              errors.category
                ? "border-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500 dark:border-gray-700"
            }`}
          >
            <option value="">Select category</option>
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
            <option value="Watch">Watch</option>
            <option value="Tablet">Tablet</option>
            <option value="Audio">Audio</option>
            <option value="Monitor">Monitor</option>
            <option value="Accessories">Accessories</option>
          </select>

          {errors.category && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Product Image */}
        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Product Image
          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={`block w-full cursor-pointer rounded-lg border bg-transparent text-sm text-gray-600 file:mr-4 file:border-0 file:bg-blue-500 file:px-4 file:py-3 file:text-sm file:font-medium file:text-white hover:file:bg-blue-600 dark:text-gray-400 ${
              errors.image
                ? "border-red-500"
                : "border-gray-200 dark:border-gray-700"
            }`}
          />

          {errors.image && (
            <p className="mt-1.5 text-sm text-red-500">
              {errors.image.message}
            </p>
          )}

          {imagePreview && (
            <div className="relative w-full h-56 mt-4 overflow-hidden bg-gray-100 border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-800">
              <Image
                src={imagePreview}
                alt="Product preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={createProduct.isPending || !isAdmin}
            className="px-6 py-3 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createProduct.isPending ? "Uploading..." : "Upload Product"}
          </button>
          {isAdmin === false && (
            <p className="border rounded-2xl py-3 px-2 ml-3.5 text-center text-sm font-bold text-red-500">
              Demo accounts can view this page but cannot upload products. :)
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
