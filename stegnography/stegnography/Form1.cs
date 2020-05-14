using System;
using System.Drawing;
using System.Windows.Forms;
using System.IO;
using System.Drawing.Imaging;
using System.Collections.Generic;
using System.Text;
using System.Net.NetworkInformation;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Net.Configuration;

namespace stegnography
{
    public partial class Form1 : Form
    {
        private static int MAX_BITS = 16;

        private static string ColorToHex(Color c)
        {
            return "#" + c.R.ToString("X2") + c.G.ToString("X2") + c.B.ToString("X2");
        }

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
        }

        private void btnSelect_Click(object sender, EventArgs e)
        {
            if (!Regex.IsMatch(txtNewFileName.Text, "^[\\w+,\' \']+$"))
            {
                return;
            }
            string NewFileName = GetNewFileName(txtNewFileName.Text);
            string fn = FileDialog("Select a file to encrypt");
            if (fn == "")
            {
                return;
            }
            string p = Path.GetDirectoryName(fn);

            string bString = StringToBinary(txtMessage.Text);
            int sLength = bString.Length;
            string bLength = LengthToBinary(sLength);

            Bitmap img = GetBitmap(fn);

            for (int i = 0; i < img.Width; i++)
            {
                for (int j = 0; j < img.Height; j++)
                {

                    Color px = img.GetPixel(i, j);
                    int R = px.R;
                    int G = px.G;
                    int B = px.B;

                    if (i == 0 && j == 0)
                    {
                        img.SetPixel(0, 0, GetColor(bLength, B));
                        continue;
                    }


                    if (sLength != 0)
                    {
                        R = ChangeLastBits(px.R, bString.Substring(0, 2));
                        bString = bString.Substring(2);
                        sLength = bString.Length;
                    }
                    if (sLength != 0)
                    {
                        G = ChangeLastBits(px.G, bString.Substring(0, 2));
                        bString = bString.Substring(2);
                        sLength = bString.Length;
                    }
                    if (sLength != 0)
                    {
                        B = ChangeLastBits(px.B, bString.Substring(0, 2));
                        bString = bString.Substring(2);
                        sLength = bString.Length;
                    }

                    Color tmp = Color.FromArgb(R, G, B);

                    img.SetPixel(i, j, tmp);
                }
            }

            try
            {
                img.Save(p + "\\" + NewFileName, ImageFormat.Png);
                MessageBox.Show("Completed");
            }
            catch (Exception ex)
            {
                MessageBox.Show("There was an error saving\n" + ex.ToString());
            }
        }

        private void btnDecrypt_Click(object sender, EventArgs e)
        {
            string fn = FileDialog("Select a file to decrypt");
            if (fn == "")
            {
                return;
            }

            string bLength = "";
            string bString = "";
            int sLength = 0;

            Bitmap img = GetBitmap(fn);

            for (int i = 0; i < img.Width; i++)
            {
                for (int j = 0; j < img.Height; j++)
                {
                    Color px = img.GetPixel(i, j);
                    if (i == 0 && j == 0)
                    {
                        string x = Convert.ToString(Convert.ToInt32(px.R.ToString(), 10), 2).PadLeft(8, '0');
                        string y = Convert.ToString(Convert.ToInt32(px.G.ToString(), 10), 2).PadLeft(8, '0');
                        bLength = x + y;
                        sLength = BinaryToLength(bLength);
                        continue;
                    }

                    if (sLength != 0)
                    {
                        bString += GetLastBits(px.R);
                        sLength -= 2;
                    }
                    if (sLength != 0)
                    {
                        bString += GetLastBits(px.G);
                        sLength -= 2;
                    }
                    if (sLength != 0)
                    {
                        bString += GetLastBits(px.B);
                        sLength -= 2;
                    }
                }
            }

            MessageBox.Show("The message is:\n\n" + BinaryToString(bString));

            img.Dispose();
        }

        private static string GetLastBits(int V)
        {
            return Convert.ToString(Convert.ToInt32(V.ToString(), 10), 2).PadLeft(8, '0').Substring(6, 2);
        }

        private static int ChangeLastBits(int V, string b)
        {
            string valueB = Convert.ToString(V, 2).PadLeft(8, '0');
            valueB = valueB.Substring(0, 6);
            valueB += b;
            return Convert.ToInt32(valueB, 2);
        }

        private static Bitmap GetBitmap(string fn)
        {
            Stream bmp;
            try
            {
                bmp = File.Open(fn, FileMode.Open);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString());
                throw;
            }
            Bitmap output = new Bitmap(Image.FromStream(bmp));
            bmp.Close();
            return output;
        }

        private static string StringToBinary(string data)
        {
            string result = "";

            foreach (char c in data.ToCharArray())
            {
                result += Convert.ToString(c, 2).PadLeft(8, '0');
            }
            return result;
        }

        private static string BinaryToString(string data)
        {
            List<Byte> byteList = new List<Byte>();

            for (int i = 0; i < data.Length; i += 8)
            {
                byteList.Add(Convert.ToByte(data.Substring(i, 8), 2));
            }
            return Encoding.ASCII.GetString(byteList.ToArray());
        }

        private static string LengthToBinary(int len)
        {
            string result = Convert.ToString(len, 2);

            result = result.PadLeft(MAX_BITS, '0');

            return result;
        }

        private static int BinaryToLength(string b)
        {
            return Convert.ToInt32(b, 2);
        }

        private static Color GetColor(string bstring, int B)
        {
            int R = Convert.ToInt32(bstring.Substring(0, 8), 2);
            int G = Convert.ToInt32(bstring.Substring(8, 8), 2);
            return Color.FromArgb(R, G, B);
        }

        private void label4_Click(object sender, EventArgs e)
        {
            txtNewFileName.Text = "";
            txtMessage.Text = "";
            txtNewFileName.Focus();
        }

        private string FileDialog(string title)
        {
            OpenFileDialog dialog = new OpenFileDialog();
            dialog.InitialDirectory = "C:";
            dialog.Filter = "txt files (*.txt)|*.txt|All files (*.*)|*.*";
            dialog.FilterIndex = 2;
            dialog.RestoreDirectory = true;
            dialog.Title = title;

            if (dialog.ShowDialog() == DialogResult.OK)
            {
                return dialog.FileName;
            }
            else
            {
                return "";
            }
        }

        private string GetNewFileName(string fn)
        {
            fn = fn.Replace(" ", "_") + ".png";
            return fn;
        }

        private void lblInfo_Click(object sender, EventArgs e)
        {
            string msg = "Welcome to the Steganographic Encyption Tool\n"
                + "Created by Evan Weiss (2020)\n\n"
                + "What does this do?\n"
                + "You can either put hidden messages within images, or extract a hidden message from an image.\n\n"
                + "How to Encrypt:\n"
                + "Define a new file name and a message. Click 'Encrypt' and select the file you want to hide the message in.\n"
                + "The new file must be a .png file, and it will be saved in the same directory as the origin image.\n"
                + "This new image now has an encrpyted message hidden within it.\n\n"
                + "How to Decrypt:\n"
                + "Click 'Decrypt' and select the image you know has a message hidden within it.\n"
                + "A message will appear that contains the hidden message.";

            MessageBox.Show(msg);
        }
    }
}
