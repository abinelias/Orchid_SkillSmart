using MGMProfileExtension.Models;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmartMongoDA.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MGMProfileExtension
{
  public class MGMProfileService : EntityService<MGMProfile>
  {
    public MGMProfileService(MongoDatabase db)
      : base(db)
    {

    }
    public override void Create(MGMProfile profile)
    {
      base.Create(profile);
    }

    public bool ProfileExists(string email)
    {
      var entityQuery = Query<MGMProfile>.EQ(e => e.email, email);
      var entity = MongoCollection.FindOne(entityQuery);
      return entity != null;
    }

    public void UpdateEmailStatus(string email, bool updated)
    {
      var entityQuery = Query<MGMProfile>.EQ(e => e.email, email);
      var entity = MongoCollection.FindOne(entityQuery);
      if (entity != null && entity.emailSent != updated)
      {
        entity.emailSent = updated;
        base.Update(entity);
      }
    }
  }
}
