using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface IPrerequisiteService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetAllPrerequisiteById(string id);
        IEnumerable<T> GetAllPrerequisite();

    }
}
