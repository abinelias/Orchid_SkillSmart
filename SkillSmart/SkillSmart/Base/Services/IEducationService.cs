using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IEducationService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetAllEducationById(string id);

    }
}
