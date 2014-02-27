using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    public interface ILanguageService<T> : IEntityService<T> where T : IEntity
    {

        IEnumerable<T> GetAllLanguagesById(string id);

    }
}
