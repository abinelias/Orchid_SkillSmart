using SkillSmartMongoDA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MGMProfileExtension.Models
{
  public class MGMProfile : MongoEntity
  {
    public MGMProfile():base()
    {
      interests = new List<PositionInterest>();
    }

    public string email { get; set; }
    public string firstName { get; set; }
    public string lastName { get; set; }
    public int minAge { get; set; }
    public string address { get; set; }
    public string city { get; set; }
    public string state { get; set; }
    public int zip { get; set; }
    public string phone { get; set;  }
    public bool emailSent { get; set; }
    public List<PositionInterest> interests { get; set; }
  }

  public class PositionOpening
  {
    public string positionId { get; set; }
    public string title { get; set; }
    public int interestLevel { get; set; }
  }

  public class PositionInterest
  {
    public string positionId { get; set; }
    public int interest { get; set; }
  }
}
