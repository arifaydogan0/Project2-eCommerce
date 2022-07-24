import React from "react";

import { postProduct } from "../../../api";
import { useMutation, useQueryClient } from "react-query";

import {
  Text,
  Box,
  FormControl,
  FormLabel,
  Input, 
  Textarea,
  Button,
} from "@chakra-ui/react";
import { message } from "antd";

import { Formik, FieldArray } from "formik";
import validationSchema from "./validations";

function NewProduct() {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("products"),
  });

  const handleSubmit = async (values, bag) => {
    console.log(values);
    message.loading({ content: "Yükleniyor...", key: "product_update" });

    const newValues = {...values, image: values.image};

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        console.log("yeni ürün success");

        message.success({
          content: "Ürün başarılı şekilde eklendi.",
          key: "product_update",
          duration: 2,
        });
      },
    });
  };

  return (
    <div>
      <Text fontSize="2xl">Yeni Ürün</Text>

      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          image: [],
          category: "",
          quantity: 1,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box my="5" textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Başlık</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                    {touched.title && errors.title && (
                      <Text color="red.500">{errors.title}</Text>
                    )}
                  </FormControl>

                  <FormControl mt="4">
                    <FormLabel>Ürün Detayı</FormLabel>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    />
                    {touched.description && errors.description && (
                      <Text color="red.500">{errors.description}</Text>
                    )}
                  </FormControl>

                  <FormControl mt="4">
                    <FormLabel>Fiyat</FormLabel>
                    <Input
                      placeholder="$"
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={touched.price && errors.price}
                    />
                    {touched.price && errors.price && (
                      <Text color="red.500">{errors.price}</Text>
                    )}
                  </FormControl>

                  <FormControl mt="4">
                    <FormLabel>Kategori</FormLabel>
                    <Input
                      placeholder={"1:Cam Malzeme, 2: Hacimsel Ölçüm , 3: Pipet, 4: Laboratuvar Malzemeleri"}
                      name="category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}
                      disabled={isSubmitting}
                      isInvalid={touched.category && errors.category}
                    />
                    {touched.category && errors.category && (
                      <Text color="red.500">{errors.category}</Text>
                    )}
                  </FormControl>

                  <FormControl mt="4">
                    <FormLabel>Fotoğraf</FormLabel>
                    <FieldArray
                      name="image"
                      render={(arrayHelpers) => (
                        <div>
                          {values.image &&
                            values.image.map((images, index) => (
                              <div key={index}>
                                <Input
                                  placeholder="https://picsum.photos/200/300"
                                  name={`image.${index}`}
                                  value={images}
                                  disabled={isSubmitting}
                                  onChange={handleChange}
                                  width="3xl"
                                />

                                <Button
                                  ml="4"
                                  type="button"
                                  colorScheme="red"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Sil
                                </Button>
                              </div>
                            ))}

                          <Button mt="5" onClick={() => arrayHelpers.push("")}>
                            Fotoğraf Ekle
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>

                  <Button
                    mt={4}
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Kaydet
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default NewProduct;
