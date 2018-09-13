using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BOL
{
    class UserIDValaidationClass: ValidationAttribute
    {
        public override bool IsValid(object param)
        {
            string Id = param.ToString();
            List<int> FirstRow = new List<int>();
            foreach (char item in Id)
            {
                FirstRow.Add(int.Parse(item.ToString()));
            }
            List<int> SecondRow = new List<int>();
            for (int i = 0; i < Id.Length; i++)
            {
                if (i % 2 == 0)
                {
                    SecondRow.Add(1);
                }
                else
                {
                    SecondRow.Add(2);
                }
            }
            List<int> ThiredRow = new List<int>();
            for (int i = 0; i < Id.Length; i++)
            {
                ThiredRow.Add(FirstRow[i] * SecondRow[i]);
            }

            List<int> FourthRow = new List<int>();

            for (int i = 0; i < Id.Length; i++)
            {
                if (ThiredRow[i] > 9)
                {
                    int firstDig = (ThiredRow[i] / 10);
                    int secondDig = ThiredRow[i] % 10;
                    FourthRow.Add(firstDig + secondDig);
                }
                else
                {
                    FourthRow.Add(ThiredRow[i]);
                }
            }

            int results = 0;
            foreach (int item in FourthRow)
            {
                results += item;
            }
            if (results % 10 == 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
    }
}
