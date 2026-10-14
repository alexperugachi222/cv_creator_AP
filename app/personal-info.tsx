import react, {useState,useEffect} from "react";
import {View,StyleSheet,ScrollView,Alert} from "react-native";
import {useRouter} from "expo-router";
import {InputField} from "../components/InputField";
import {NavigationButton} from "../components/NavigationButton";
import {useCVContext} from "../context/CVContext";
import {PersonalInfo} from "../types/cv.types";

export default function PersonalInfoScreen() {
   const router = useRouter();
   const {cvData, updatePersonalInfo} = useCVContext();
   const [formData, setformData]= useState<PersonalInfo>(cvData.personalInfo);

   useEffect(() => {
    setformData(cvData.personalInfo);

   },[cvData.personalInfo]);

   const handleSave = () => {
     if (!formData.fullName || !formData.email){
        Alert.alert("Error", "Por favor completa al menos el nombre y email");
        return;
     }

     updatePersonalInfo(formData);
     Alert.alert("Exito", "Informacion guardada correctamente",[
        {text:"OK", onPress:() => router.back()},
     ]);
   };
   return(
    <ScrollView style={styles.container}>
        <View style={styles.content}>
            <InputField
            label="Nombre Completo *"
            placeholder ="Juan Perez"
            value={formData.fullName}
            onChangeText={(text) => setformData({...formData,fullName:text})}
            />
            <InputField
            label="email"
            placeholder ="jose@email.com"
            value={formData.email}
            onChangeText={(text) => setformData({...formData,email:text})}            
            />
            <InputField
            label="telefono"
            placeholder ="+593 99 999 9999 "
            value={formData.phone}
            onChangeText={(text) => setformData({...formData,phone:text})}            
            />
            <InputField
            label="ubicacion"
            placeholder ="Quito, Ecuador"
            value={formData.location}
            onChangeText={(text) => setformData({...formData,location:text})}            
            />
            <InputField
            label="Resumen profesional"
            placeholder ="Describe brebemente tu perfil profesional..."
            value={formData.summary}
            onChangeText={(text) => setformData({...formData,summary:text})}
            multiline
            numberOfLines={4}
            style={{ height:100, textAlignVertical:"top"}}            
            />

            <NavigationButton title="Guardar Informacion" onPress={handleSave}/>
            <NavigationButton
                title="Cancelar"
                onPress={()=> router.back}
                variant= "secondary"
            />
        </View>
    </ScrollView>
   );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f5f5f5",
    },
    content: {
        padding:20,
    },
});

