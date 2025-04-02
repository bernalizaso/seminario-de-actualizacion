#include <iostream>
#include <string>

struct
{
    std::string userName;
    std::string password;
} UserData;

// Función para limpiar el buffer de entrada sacada de chatgpt, bastante basica
void limpiarBuffer()
{
    std::cin.clear();  // Limpia el estado de error de cin (si lo hay)
    std::cin.ignore(); // Limpia el /n guardado en el buffer (si lo hay)
}

void ingreso(void (*menu)())
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
        if (intento < 3 && (usuario != UserData.userName || contrasenia != UserData.password))
        {
            std::cout << "Usuario o contraseña incorrecto" << std::endl;
            std::cout << "Ingrese el nombre de usuario: " << std::endl;
            std::getline(std::cin, usuario);
            std::cout << "Ingrese la contrasenia: " << std::endl;
            std::getline(std::cin, contrasenia);
            intento++;
            limpiarBuffer();
            if (intento >= 3)
            {
                std::cout << "Usuario bloqueado. Contacte al administrador" << std::endl;
                break;
            }
        }
        else
        {
            std::cout << "¡Bienvenido/a " << UserData.userName << std::endl;
            intento = 1;
            menu();
            break;
        }
    }
}

void cambiarPassword()
{
    std::string contrasenia;

    std::cout << "Ingrese la nueva contraseña: " << std::endl;

    std::getline(std::cin, contrasenia);

    if (contrasenia == "")
    {
        std::cout << "La contrasenia no puede estar vacia" << std::endl;
        //cin hace que no funcione el bloque de validacion ya que poner espacio, arreglado con getline
    }
    else
    {
        std::cout << "Contraseña cambiada exitosamente!" << std::endl;
        UserData.password = contrasenia;
    }
}

void menu()
{
    limpiarBuffer();
    int opcion = 0;
    std::cout << "Ingrese una opcion: " << std::endl;
    std::cout << "1-Cambiar contraseña." << std::endl;
    std::cout << "X. Salir" << std::endl;
    std::cin >> opcion;
    switch (opcion)
    {
    case 1:
        limpiarBuffer();
        cambiarPassword();
        ingreso(menu);
        break;
    default:
        limpiarBuffer();
        ingreso(menu);
        break;
    }
}

int main()
{
    UserData.userName = "usuario123x";
    UserData.password = "contrasenia123x";

    ingreso(menu);

    return 0;
}
