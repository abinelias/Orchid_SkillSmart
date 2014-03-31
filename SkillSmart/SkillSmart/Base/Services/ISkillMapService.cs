using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ISkillMapService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetSkillsByCategoryId(string id);
        IEnumerable<T> GetAllSkillMap();

    }
}
