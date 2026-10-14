import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Education } from "../types/cv.types";

type EducationFormData = Omit<Education, "id">;

const emptyForm: EducationFormData = {
  institution: "",
  degree: "",
  field: "",
  graduationYear: "",
};

export default function EducationScreen() {
  const router = useRouter();
  const { cvData, addEducation, deleteEducation } = useCVContext();
  const [formData, setFormData] = useState<EducationFormData>(emptyForm);

  const handleAdd = () => {
    if (!formData.institution.trim() || !formData.degree.trim()) {
      Alert.alert(
        "Información incompleta",
        "Por favor completa al menos la institución y el título."
      );
      return;
    }

    addEducation({
      id: Date.now().toString(),
      ...formData,
    });
    setFormData({ ...emptyForm });
    Alert.alert("Éxito", "Educación agregada correctamente.");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta educación?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteEducation(id),
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.sectionTitle}>Agregar Educación</Text>

      <InputField
        label="Institución *"
        placeholder="Nombre de la institución"
        value={formData.institution}
        onChangeText={(institution) =>
          setFormData((current) => ({ ...current, institution }))
        }
      />
      <InputField
        label="Título o nivel de estudios *"
        placeholder="Ej: Licenciatura"
        value={formData.degree}
        onChangeText={(degree) =>
          setFormData((current) => ({ ...current, degree }))
        }
      />
      <InputField
        label="Área de estudio"
        placeholder="Ej: Ingeniería de Sistemas"
        value={formData.field}
        onChangeText={(field) =>
          setFormData((current) => ({ ...current, field }))
        }
      />
      <InputField
        label="Año de graduación"
        placeholder="Ej: 2024"
        value={formData.graduationYear}
        onChangeText={(graduationYear) =>
          setFormData((current) => ({ ...current, graduationYear }))
        }
        keyboardType="numeric"
      />

      <NavigationButton title="Agregar Educación" onPress={handleAdd} />

      {cvData.education.length > 0 && (
        <>
          <Text style={styles.listTitle}>Educación agregada</Text>
          {cvData.education.map((education) => (
            <View key={education.id} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{education.degree}</Text>
                <Text style={styles.cardSubtitle}>
                  {education.institution}
                </Text>
                {!!education.field && (
                  <Text style={styles.cardDetail}>{education.field}</Text>
                )}
                {!!education.graduationYear && (
                  <Text style={styles.cardDetail}>
                    Graduación: {education.graduationYear}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`Eliminar educación: ${education.degree}`}
                style={styles.deleteButton}
                onPress={() => handleDelete(education.id)}
              >
                <Text style={styles.deleteButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}

      <NavigationButton
        title="Volver"
        onPress={() => router.back()}
        variant="secondary"
        style={styles.backButton}
      />
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 12,
    color: "#95a5a6",
    marginTop: 2,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 16,
  },
});