import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const DateInputField = ({ label, value, onChangeText, placeholder }: DateInputFieldProps) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleChange = (event: any, selectedDate?: Date) => {
    // Ocultamos el calendario tras la interacción
    setShow(false);

    // Si el usuario seleccionó una fecha (y no canceló)
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      
      // Formateamos la fecha a texto (Ej: "10/2023") para no alterar tu tipado actual
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = selectedDate.getFullYear();
      onChangeText(`${month}/${year}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      {/* Botón que simula ser un Input */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShow(true)}
        activeOpacity={0.7}
      >
        <Text style={{ color: value ? "#333" : "#999", fontSize: 16 }}>
          {value || placeholder || "Seleccionar fecha"}
        </Text>
      </TouchableOpacity>

      {/* Selector de fecha nativo */}
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    height: 50, // Misma altura que un TextInput normal
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});