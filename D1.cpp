#include <iostream>
#include <string>

struct
{
    std::string userName;
    std::string password;
} UserData;

int main(int argc, char const *argv[])
{
    UserData.userName = "usuario123x";
    UserData.password = "contrasenia123x";

    std::string usuario = "0", contrasenia = "0";
    int intento = 1;

    std::cout << "Ingrese el nombre de usuario: " << std::endl;
    std::cin >> usuario;
    std::cout << "Ingrese la contrasenia: " << std::endl;
    std::cin >> contrasenia;
    while (intento < 3)
    {
        if (intento < 3 && (usuario != UserData.userName || contrasenia != UserData.password))
        {
            std::cout << "Usuario o contraseña incorrecto" << std::endl;
            std::cout << "Ingrese el nombre de usuario: " << std::endl;
            std::cin >> usuario;
            std::cout << "Ingrese la contrasenia: " << std::endl;
            std::cin >> contrasenia;
            intento++;
            if (intento >= 3)
            {
                std::cout << "Usuario bloqueado. Contacte al administrador" << std::endl;
            }
        }
        else
        {
            std::cout << "¡Bienvenido/a " << UserData.userName << std::endl;
            break;
        }
    }

    return 0;
}
