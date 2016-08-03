using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text;
namespace HTML5TEST
{
    public partial class 案例11 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            String strResult=String.Empty;
            try
            {
                String fileName = Server.UrlDecode(Request.QueryString["fileName"]).ToString();
                FileStream fs = new FileStream(fileName, FileMode.Create);
                Stream instream = Request.InputStream;
                Int32 len = Convert.ToInt32(instream.Length);
                if (Request.QueryString["fileType"].ToString().Equals("1"))
                {
                    System.IO.BinaryReader br = new System.IO.BinaryReader(instream);
                    byte[] buffer = br.ReadBytes(len);
                    BinaryWriter w = new BinaryWriter(fs);
                    for (int i = 0; i < buffer.Length; i++)
                        w.Write(buffer[i]);
                    w.Flush();
                    w.Close();
                    fs.Close(); // 关闭并释放资源，
                }
                else
                {
                    int count = 0;
                    byte[] buffer = new byte[1024];

                    StringBuilder builder = new StringBuilder();

                    while ((count = instream.Read(buffer, 0, 1024)) > 0)
                    {

                        builder.Append(Encoding.UTF8.GetString(buffer, 0, count));

                    }
                    StreamWriter w = new StreamWriter(fs, Encoding.GetEncoding("utf-8")); 

                    w.WriteLine(builder.ToString());    // 输出信息。
                    w.Close(); // 关闭数据流并释放所占资源
                    fs.Close(); // 关闭并释放资源，
                }
             
                strResult = "上传成功";
            }
            catch
            {
                strResult = "上传失败";
            }
            finally
            {
                Response.Write(strResult);
                Response.Flush();
                Response.Close();
            }
        }
    }
}