#include <iostream>
#include <string>
#include <cctype>
#include <cmath>
int main()
{
    /*std::string prueba = "!AsDdsaA123!!!!";
    int contadorNoAlpha = 0;
    int contadorMayus = 0;
    for (int i = 0; i <= prueba.length() - 1; i++)
    {
        std::string es = "";
        es = prueba[i];

        if (es.find_first_not_of("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") != std::string::npos)
        {
            contadorNoAlpha++;
            std::cout<<contadorNoAlpha;
        }
    }

    for (char c : prueba)
    {
        if (isupper(c))
        {
            contadorMayus++;
            std::cout<<contadorMayus;
        }
    }

    if (8 <= prueba.length() <= 16 && contadorNoAlpha > 0 && contadorMayus >= 2)
    {
        std::cout << "Paso la prueba" << std::endl;
    }*/

    int a=2;
    std::cout<<std::isnan(a);
    return 0;
}