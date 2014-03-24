using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ISkillAliasService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetAllSkillAliasById(string id);

    }
}
