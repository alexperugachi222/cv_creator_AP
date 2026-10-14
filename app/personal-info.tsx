import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { PersonalInfo } from "../types/cv.types";

// 1. Definimos las reglas de validación (Zod Schema)
const personalInfoSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingrese un correo electrónico válido"),
  // La expresión regular asegura que solo reciba números, +, guiones o espacios
  phone: z.string().regex(/^[0-9+\-\s()]*$/, "Ingrese un número válido"),
  location: z.string(),
  summary: z.string(),
});

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { cvData, updatePersonalInfo } = useCVContext();

  // 2. Configuramos el formulario indicando que valide "al cambiar" (onChange)
  const { control, handleSubmit, reset, formState: { errors } } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: cvData.personalInfo,
    mode: "onChange", // <-- ESTO HACE QUE LA ALERTA SALGA INMEDIATAMENTE
  });

  useEffect(() => {
    reset(cvData.personalInfo);
  }, [cvData.personalInfo, reset]);

  // 3. Esta función solo se ejecuta si no hay errores en el formulario
  const onSubmit = (data: PersonalInfo) => {
    updatePersonalInfo(data);
    Alert.alert("Éxito", "Información guardada correctamente", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Nombre Completo *"
              placeholder="Juan Perez"
              value={value}
              onChangeText={onChange}
              error={errors.fullName?.message} // Conecta el error visualmente
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Email *"
              placeholder="jose@email.com"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Teléfono"
              placeholder="+593 99 999 9999"
              value={value}
              onChangeText={onChange}
              error={errors.phone?.message}
              keyboardType="phone-pad" // Levanta el teclado numérico nativo
            />
          )}
        />

        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Ubicación"
              placeholder="Quito, Ecuador"
              value={value}
              onChangeText={onChange}
              error={errors.location?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="summary"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Resumen profesional"
              placeholder="Describe brevemente tu perfil profesional..."
              value={value}
              onChangeText={onChange}
              error={errors.summary?.message}
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: "top" }}
            />
          )}
        />

        {/* handleSubmit envolverá nuestra función onSubmit */}
        <NavigationButton title="Guardar Información" onPress={handleSubmit(onSubmit)} />
        
        <NavigationButton
          title="Cancelar"
          onPress={() => router.back()}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
});