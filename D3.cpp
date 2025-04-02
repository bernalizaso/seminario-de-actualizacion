#include <iostream>
#include <string>
#include <cctype> //para find_first_not_of y isupper
struct
{
    std::string userName;
    std::string password;
} UserData;

void limpiarBuffer()
{
    std::cin.clear();
    std::cin.ignore();
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

bool validacion()
{

    std::string prueba = UserData.password;
    int contadorNoAlpha = 0;
    int contadorMayus = 0;
    for (int i = 0; i <= prueba.length() - 1; i++)
    {
        std::string es = "";
        es = prueba[i];

        if (es.find_first_not_of("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") != std::string::npos)//podria ser -1 pero si alguien tiene que refactorizar esto no va a entender el por que
        {
            contadorNoAlpha++;
        }
    }

    for (char c : prueba)
    {
        if (isupper(c))
        {
            contadorMayus++;
        }
    }

    if (8 <= prueba.length() <= 16 && contadorNoAlpha >= 2 && contadorMayus >= 1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

void cambiarPassword(bool (*validacion)())
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
    else if (validacion() == false)
    {
        std::cout << "La contrasenia debe contener al menos una mayuscula y 2 caracteres especiales" << std::endl;
        UserData.password = ViejaContrasenia;
    }
    else
    {
        std::cout << "Contraseña cambiada exitosamente!" << std::endl;
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
        cambiarPassword(validacion);
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
    UserData.userName = "usuario123x!!";
    UserData.password = "contrasenia123x!!";

    ingreso(menu);

    return 0;
}
