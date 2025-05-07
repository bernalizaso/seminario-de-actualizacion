#include <iostream>
#include <string>
#include <cctype> //para find_first_not_of y isupper
#include <vector>

void limpiarBuffer();
void menuInicio();
void ingreso();
void menuIngreso();
bool validacion();
void cambiarPassword();
void menuCreacion();

void limpiarBuffer()
{
    std::cin.clear();
    std::cin.ignore();
}

// ZONA DATOS
struct User
{
    int id;
    std::string userName;
    std::string password;
};

std::vector<User> usuarios;
User UserData; 

// ZONA FUNCIONES
void ingreso()
{
    std::string usuario = "0", contrasenia = "0";
    int intento = 1;
    limpiarBuffer();

    std::cout << "Ingrese el nombre de usuario: " << std::endl;
    std::getline(std::cin, usuario);
    std::cout << "Ingrese la contrasenia: " << std::endl;
    std::getline(std::cin, contrasenia);
    
    while (intento < 3)
    {
        bool credencialesCorrectas = false;

        for (const User& user : usuarios) {
            if (usuario == user.userName && contrasenia == user.password) {
                UserData = user;
                credencialesCorrectas = true;
                break;
            }
        }

        if (!credencialesCorrectas)
        {
            std::cout << "Usuario o contraseña incorrecto" << std::endl;
            std::cout << "Ingrese el nombre de usuario: " << std::endl;
            std::getline(std::cin, usuario);
            std::cout << "Ingrese la contrasenia: " << std::endl;
            std::getline(std::cin, contrasenia);
            intento++;
            limpiarBuffer();
            
            if (intento >= 3) {
                std::cout << "Usuario bloqueado. Contacte al administrador" << std::endl;
                return;
            }
        }
        else
        {
            std::cout << "¡Bienvenido/a " << UserData.userName << std::endl;
            intento = 1;
            menuIngreso();
            break;
        }
    }
}
bool validacion(const std::string& prueba) {
    int especiales = 0;
    int mayusculas = 0;
    
    for (char c : prueba) {
        if (!isalnum(c)) especiales++;
        if (isupper(c)) mayusculas++;
    }
    
    return prueba.length() >= 10 && 
           prueba.length() <= 18 &&
           especiales >= 2 && 
           mayusculas >= 1;

//mucho mas simplificada porque la otra era super desprolija y encontre mejores funciones
}

void cambiarPassword()
{
    std::string ViejaContrasenia = UserData.password;
    std::string NuevaContrasenia;

    std::cout << "Ingrese la nueva contraseña: " << std::endl;

    std::getline(std::cin, NuevaContrasenia);
    UserData.password = NuevaContrasenia;

    if (NuevaContrasenia.empty())
    {
        std::cout << "La contrasenia no puede estar vacia" << std::endl;
        UserData.password = ViejaContrasenia;
    }
    else if (!validacion(NuevaContrasenia))
    {
        std::cout << "La contrasenia debe contener al menos una mayuscula y 2 caracteres especiales" << std::endl;
        UserData.password = ViejaContrasenia;
    }
    else
    {
        std::cout << "Contraseña cambiada exitosamente!" << std::endl;
    }
}

void crearCuenta() {
    std::string nombreUsuario, contrasenia;
    limpiarBuffer();
    
    std::cout << "Ingrese un nombre de usuario: ";
    std::getline(std::cin, nombreUsuario);
    
    std::cout << "Ingrese una contraseña (10-18 caracteres, 1 mayuscula, 2 especiales): ";
    std::getline(std::cin, contrasenia);

    if (contrasenia.empty()) {
        std::cout << "La contraseña no puede estar vacia"<<std::endl;
        return;
    }
    
    if (!validacion(contrasenia)) {
        std::cout << "La contraseña no cumple los requisitos"<<std::endl;
        return;
    }

    User nuevoUsuario;
    nuevoUsuario.id = usuarios.empty() ? 1 : usuarios.back().id + 1;
    nuevoUsuario.userName = nombreUsuario;
    nuevoUsuario.password = contrasenia;
    
    usuarios.push_back(nuevoUsuario);
    std::cout << "¡Usuario creado exitosamente!"<<std::endl;
    //int i=0;
    //for(User nuevoUsuario:usuarios){
    //std::cout << usuarios[i].userName << std::endl;
    //i++;}
}

// ZONA MENU
void menuInicio()
{
    int opcion = 0;
    while(true) {
        std::cout << "-----Bienvenido-----" << std::endl;
        std::cout << "Ingrese una opcion: " << std::endl;
        std::cout << "1.-Iniciar sesion" << std::endl;
        std::cout << "2.-Crear cuenta usuario" << std::endl;
        std::cout << "3.-Salir" << std::endl;  
        std::cin >> opcion;
        limpiarBuffer();

        switch(opcion) {
            case 1:
                ingreso();
                break;
            case 2:
                menuCreacion();
                break;
            case 3:
                std::cout << "Saliendo." << std::endl;
                return; 
            default:
                std::cout << "Opcion inválida" << std::endl;
        }
    }
}

void menuIngreso()
{
    int opcion = 0;
    while(true) {
        std::cout << "Ingrese una opcion: " << std::endl;
        std::cout << "1.-Cambiar contraseña." << std::endl;
        std::cout << "2.-Salir al menu principal" << std::endl;
        std::cin >> opcion;
        limpiarBuffer();

        switch (opcion) {
            case 1:
                cambiarPassword();
                break;
            case 2:
                return;  
            default:
                std::cout << "Opcion inválida" << std::endl;
        }
    }
}

void menuCreacion()
{
    int opcion = 0;
    while(true) {
        std::cout << "Ingrese una opcion: " << std::endl;
        std::cout << "1.-Crear usuario" << std::endl;
        std::cout << "2.-Salir al menu principal" << std::endl;
        std::cin >> opcion;
        limpiarBuffer();

        switch(opcion) {
            case 1:
                crearCuenta();
                break;
            case 2:
                return;  
            default:
                std::cout << "Opcion inválida" << std::endl;
        }
    }
}
int main()
{

    menuInicio();

    return 0;
}
