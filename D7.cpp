#include <iostream>
#include <string>
#include <cctype> //para find_first_not_of y isupper
#include <vector>
#include <cmath>

void limpiarBuffer();
void menuInicio();
void ingreso();
void menuIngreso();
bool validacion();
void cambiarPassword();
void menuCreacion();
void menuArticulos();

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

class Articulo
{
private:
    std::string nombre;
    int id;
    double precio;
    int stock;

public:
    Articulo(std::string nombre_, int stock, double precio_, int id_);
    ~Articulo() {};
    int getId() const;
    int getStock() const;
    double getPrecio() const;
    std::string getNombre() const;
    void setStock(int stock_);
    void setPrecio(double precio_);
    void setId(int id_);
    void setNombre(std::string nombre_);
};
Articulo::Articulo(std::string nombre_, int stock_, double precio_, int id_)
    : nombre(nombre_), stock(stock_), precio(precio_), id(id_) {}
int Articulo::getId() const { return id; }
int Articulo::getStock() const { return stock; }
double Articulo::getPrecio() const { return precio; }
std::string Articulo::getNombre() const { return nombre; }

void Articulo::setStock(int stock_) { stock = stock_; }
void Articulo::setPrecio(double precio_) { precio = precio_; }
void Articulo::setId(int id_) { id = id_; }
void Articulo::setNombre(std::string nombre_) { nombre = nombre_; }

std::vector<User>
    usuarios;
User UserData;

// ZONA CONTROLADORES

class ArticulosController
{
private:
    std::vector<Articulo> Articulos;

public:
    ArticulosController();
    ~ArticulosController();
    void crearArticulo()
    {
        std::string nombreArticulo;
        int idArticulo, stockArticulo;
        double precioArticulo;
        std::cout << "Ingrese el nombre del articulo" << std::endl;
        std::getline(std::cin, nombreArticulo);
        std::cout << "Ingrese el id del articulo" << std::endl;
        std::cin >> idArticulo;
        std::cout << "Ingrese el stock del articulo" << std::endl;
        std::cin >> stockArticulo;
        std::cout << "Ingrese el precio del articulo" << std::endl;
        std::cin >> precioArticulo;

        for (const Articulo &art : Articulos)
        {
            if (art.getId() == idArticulo || idArticulo <= 0)
            {
                std::cout << "Error: ID ya registrado o es invalido."<< std::endl;
                limpiarBuffer();
                return;
            }
        }
        if (nombreArticulo.empty() || stockArticulo < 0 || precioArticulo < 0)
        {
            std::cout << "El articulo debe tener un nombre, id, precio y stock validos" << std::endl;
            limpiarBuffer();
            return;
        }
        else
        {
            Articulo ArticuloCreado(nombreArticulo, stockArticulo, precioArticulo, idArticulo);
            Articulos.push_back(ArticuloCreado);
            std::cout << "Articulo creado exitosamen3" << std::endl;
            limpiarBuffer();
            return;
        }
    };
    void eliminarArticulo()
    {
        int id;
        std::cout << "Ingrese el ID del articulo a eliminar: "<< std::endl;
        std::cin >> id;

        for (int i = 0; i < Articulos.size(); ++i)
        {
            if (Articulos[i].getId() == id)
            {
                Articulos.erase(Articulos.begin() + i);
                std::cout << "Articulo eliminado"<< std::endl;
                return;
            }
        }
    };
    void editarArticulo()
    {
        int id;
        std::cout << "Ingrese el ID del articulo a editar: "<< std::endl;
        std::cin >> id;

        for (auto &articulo : Articulos)
        {
            if (articulo.getId() == id)
            {
                std::string nuevoNombre;
                int nuevoStock;
                double nuevoPrecio;

                std::cout << "Nuevo nombre (" << articulo.getNombre() << "): "<< std::endl;
                std::cin.ignore();
                std::getline(std::cin, nuevoNombre);
                if (!nuevoNombre.empty())
                    articulo.setNombre(nuevoNombre);

                std::cout << "Nuevo stock (" << articulo.getStock() << "): "<< std::endl;
                std::cin >> nuevoStock;
                if (nuevoStock >= 0)
                    articulo.setStock(nuevoStock);

                std::cout << "Nuevo precio (" << articulo.getPrecio() << "): "<< std::endl;
                std::cin >> nuevoPrecio;
                if (nuevoPrecio > 0)
                    articulo.setPrecio(nuevoPrecio);

                std::cout << "Articulo actualizado!" << std::endl;
                return;
            }
        }
        std::cout << "Error: ID no encontrado." << std::endl;
    }

    void listarArticulos()
    {
        if (Articulos.empty())
        {
            std::cout << "No hay articulos registrados."<< std::endl;
            return;
        }

        std::cout << "--- ARTICULOS ---"<< std::endl;
        for (const auto &articulo : Articulos)
        {
            std::cout << "ID: " << articulo.getId() << std::endl;
            std::cout << " | Nombre: " << articulo.getNombre() << std::endl;
            std::cout << " | Stock: " << articulo.getStock() << std::endl;
            std::cout << " | Precio: $" << articulo.getPrecio() << std::endl;
        }
    };
    void comprarArticulo()
    {
        int id, cantidad;
        std::cout << "Ingrese el ID del articulo a comprar: "<< std::endl;
        std::cin >> id;
        limpiarBuffer();

        for (auto &articulo : Articulos)
        {
            if (articulo.getId() == id)
            {
                if (articulo.getStock() <= 0)
                {
                    std::cout << "El articulo no tiene stock disponible."<< std::endl;
                    return;
                }

                std::cout << "Stock disponible: " << articulo.getStock() << ""<< std::endl;
                std::cout << "Ingrese la cantidad a comprar: "<< std::endl;
                std::cin >> cantidad;
                limpiarBuffer();

                if (cantidad <= 0)
                {
                    std::cout << "Cantidad invalida!";
                    return;
                }

                if (cantidad > articulo.getStock())
                {
                    std::cout << "No hay suficiente stock!";
                    return;
                }

                articulo.setStock(articulo.getStock() - cantidad);
                std::cout << "Compra realizada exitosamente!"<< std::endl;
                std::cout << "Stock restante: " << articulo.getStock() << ""<< std::endl;
                return;
            }
        }
        std::cout << "Articulo no encontrado!";
    }
};
ArticulosController::ArticulosController() = default;
ArticulosController::~ArticulosController() = default;

ArticulosController controlador;
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

        for (const User &user : usuarios)
        {
            if (usuario == user.userName && contrasenia == user.password)
            {
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

            if (intento >= 3)
            {
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
bool validacion(const std::string &prueba)
{
    int especiales = 0;
    int mayusculas = 0;

    for (char c : prueba)
    {
        if (!isalnum(c))
            especiales++;
        if (isupper(c))
            mayusculas++;
    }

    return prueba.length() >= 10 &&
           prueba.length() <= 18 &&
           especiales >= 2 &&
           mayusculas >= 1;

    // mucho mas simplificada porque la otra era super desprolija y encontre mejores funciones
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

void crearCuenta()
{
    std::string nombreUsuario, contrasenia;
    limpiarBuffer();

    std::cout << "Ingrese un nombre de usuario: ";
    std::getline(std::cin, nombreUsuario);

    std::cout << "Ingrese una contraseña (10-18 caracteres, 1 mayuscula, 2 especiales): ";
    std::getline(std::cin, contrasenia);

    if (contrasenia.empty())
    {
        std::cout << "La contraseña no puede estar vacia" << std::endl;
        return;
    }

    if (!validacion(contrasenia))
    {
        std::cout << "La contraseña no cumple los requisitos" << std::endl;
        return;
    }

    User nuevoUsuario;
    nuevoUsuario.id = usuarios.empty() ? 1 : usuarios.back().id + 1;
    nuevoUsuario.userName = nombreUsuario;
    nuevoUsuario.password = contrasenia;

    usuarios.push_back(nuevoUsuario);
    std::cout << "¡Usuario creado exitosamente!" << std::endl;
    // int i=0;
    // for(User nuevoUsuario:usuarios){
    // std::cout << usuarios[i].userName << std::endl;
    // i++;}
}

// ZONA MENU
void menuInicio()
{
    int opcion = 0;
    while (true)
    {
        std::cout << "-----Bienvenido-----" << std::endl;
        std::cout << "Ingrese una opcion: " << std::endl;
        std::cout << "1.-Iniciar sesion" << std::endl;
        std::cout << "2.-Crear cuenta usuario" << std::endl;
        std::cout << "3.-Articulos" << std::endl;
        std::cout << "4.-Salir" << std::endl;
        std::cin >> opcion;
        limpiarBuffer();

        switch (opcion)
        {
        case 1:
            ingreso();
            break;
        case 2:
            menuCreacion();
            break;
        case 3:
            menuArticulos();
            break;
        case 4:
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
    while (true)
    {
        std::cout << "Ingrese una opcion: " << std::endl;
        std::cout << "1.-Cambiar contraseña." << std::endl;
        std::cout << "2.-Salir al menu principal" << std::endl;
        std::cin >> opcion;
        limpiarBuffer();

        switch (opcion)
        {
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
void menuArticulos()
{

    int opcion = 0;

    while (true)
    {
        std::cout << std::endl
                  << "----- Menu Articulos -----" << std::endl;
        std::cout << "1. Listar articulos" << std::endl;
        std::cout << "2. Nuevo articulo" << std::endl;
        std::cout << "3. Editar articulo" << std::endl;
        std::cout << "4. Eliminar articulo" << std::endl;
        std::cout << "5. Comprar articulo"<< std::endl;        
        std::cout << "6. Volver al menu principal"<< std::endl; 
        std::cout << "Ingrese una opcion: ";
        std::cin >> opcion;
        limpiarBuffer();

        switch (opcion)
        {
        case 1:
            controlador.listarArticulos();
            break;
        case 2:
            controlador.crearArticulo();
            break;
        case 3:
            controlador.editarArticulo();
            break;
        case 4:
            controlador.eliminarArticulo();
            break;
        case 5: // Nuevo caso
            controlador.comprarArticulo();
            break;
        case 6:
            return;
        default:
            std::cout << "Opcion no valida!" << std::endl;
        }
    }
}
void menuCreacion()
{
    int opcion = 0;
    while (true)
    {
        std::cout << "Ingrese una opcion: " << std::endl;
        std::cout << "1.-Crear usuario" << std::endl;
        std::cout << "2.-Salir al menu principal" << std::endl;
        std::cin >> opcion;
        limpiarBuffer();

        switch (opcion)
        {
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
